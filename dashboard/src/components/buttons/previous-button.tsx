import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Button from '@mui/material/Button';
/* eslint-disable-next-line */
export function PreviousButton({onClick, ...props}: {onClick: () => void, [key: string]: any}) {
    return (
        <Button variant="outlined" color="inherit" size='small' startIcon={<ArrowBackIosNewRoundedIcon />} onClick={onClick} {...props}>
          Edellinen
        </Button>
    )
}