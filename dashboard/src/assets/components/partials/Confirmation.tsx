import { Button, Modal, Paper } from "@mui/material";

type ConfirmationProps = {
    open: boolean
    onClose: () => void
    callback: () => void
    message: string
}

export function Confirmation(props: ConfirmationProps) {
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