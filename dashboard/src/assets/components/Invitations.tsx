import { Button, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { getDateTimeFromUTC } from "../functions/formatDates";
import { useGetInvitations, useAcceptInvitation } from "../hooks/api-hooks/useInvitations";
import { useAppContext } from "../context/appContext";

type ConfirmationProps = {
    open: boolean
    onClose: () => void
    callback: () => void
    message: string
}

function Confirmation(props: ConfirmationProps) {
    return (
        <Modal open={props.open} onClose={props.onClose} className="flex justify-center h-full">
            <Paper elevation={3} className="m-auto p-6">
                <h2>Oletko varma</h2>
                <p>{props.message}</p>
                <div className="flex justify-center gap-2 pt-2">
                    <Button color="success" variant="contained" onClick={props.callback}>Kyllä</Button>
                    <Button color="error" onClick={props.onClose}>Peruuta</Button>
                </div>
            </Paper>
        </Modal>
    )
}

export default function Invitations() {
    const { user, setUser } = useAppContext()
    const { data, refetch } = useGetInvitations({ token: user?.token ?? "" })
    const { mutate: acceptInvitation } = useAcceptInvitation()
    const [modalOpen, setModalOpen] = useState(false)
    

    const invitations = data?.map((invitation, i) => {
        const date = new Date(invitation.createdAt)
        const dateTime = getDateTimeFromUTC(invitation.createdAt)
        const expires = getDateTimeFromUTC(new Date(date.setSeconds(date.getSeconds() + 604800)))
        return (
            <Paper key={i} elevation={3} className="p-4">
                <h3>{invitation.organization.name}</h3>
                <p>Käyttäjärooli: <b>{invitation.role}</b></p>
                <p>Lähetetty: <b>{dateTime.date}</b></p>
                <p>Vanhenee: <b>{expires.date}</b> </p>
                <div className="flex justify-center gap-2 pt-2">
                    <Button color="success" variant="contained" onClick={() => accept(invitation._id)}>Hyväksy</Button>
                    <Button color="error" onClick={() => { setModalOpen(true) }}>Hylkää</Button>
                </div>
            </Paper>
        )
    })

    function accept(invitation_id: string) {
        acceptInvitation({
            _id: invitation_id, token: user?.token ?? ""
        },
            {
                onSuccess(list) {
                    // we accepted invitation and server responded with new organization that we now have access
                    // we must set it to our user organizations
                    if(!user) return
                    let newOrganizationList = user.user.organizations
                    if(newOrganizationList){
                        newOrganizationList.push(list)
                    } else {
                        newOrganizationList = [list]
                    }

                    setUser({
                        ...user,
                        user: {
                            ...user.user,
                            organizations: newOrganizationList
                        }
                    })

                    // Refres invitations
                    refetch()
                },
                onError(error) {
                    console.error(error)
                },
            })
    }
    
    function decline() {
        console.log("kyllä")
        setModalOpen(false)
    }

    return (
        <>
            <section className="grid gap-4 text-left">
                {invitations}
            </section>
            <Confirmation
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                callback={decline}
                message="" />
        </>
    )
}