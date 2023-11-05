import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreateEvent } from "../assets/components/CreateEvent";
import EventTable from "../assets/components/EventTable";
import { ErrorNode } from "../assets/components/partials/Error";
import Loading from "../assets/components/partials/Loading";
import { useAppContext } from "../assets/context/appContext";
import useDetailedOrganizations from "../assets/hooks/api-hooks/useDetailedOrganisations";

export default function Events() {
    const { organization_id } = useParams() // We take org_id from URL so that you can always come back to organization with link
    const { user } = useAppContext()
    if( !organization_id || !user ) return
    const { data: organization, isLoading, isError, refetch } = useDetailedOrganizations({ organization_id: organization_id, token: user.token })

    const [modalOpen, setModalOpen] = useState(false)

    if(isLoading) return <Loading />

    if(organization) return (
        <main className="w-full m-auto mb-6 text-center">
            <section className="pt-6">
                <h2 className="text-center p-2">Tapahtumat listattuna tähän</h2>
            </section>
            <section className="pt-6">
                <Button onClick={() => setModalOpen(true)} color='info' variant='contained'><h3>Luo uusi tapahtuma </h3></Button>
                <Dialog
                    keepMounted
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    sx={{
                        '& .MuiDialog-paper': {padding: '16px'}
                    }}
                >
                    <h2>Luo uusi tapahtuma</h2>
                    <CreateEvent organization={organization} />
                </Dialog>



            </section>
            <section className="mr-32 ml-32 pt-6">
                <h4 className="text-center p-2">Tapahtuma lista...</h4>
                <EventTable />
            </section>
        </main>
    )

    return <ErrorNode />
}