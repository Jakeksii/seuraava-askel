import Button from '@mui/material/Button';

export function NextButton({onClick}: {onClick: () => void}) {
    return (
        <Button variant="contained" color="inherit" onClick={onClick}>
          Seuraava
        </Button>
    )
}