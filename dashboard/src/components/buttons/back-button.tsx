import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Button from '@mui/material/Button';
import { useRouter } from 'src/routes/hooks';

export function BackButton({to}: {to?: string}) {
    const navigate = useRouter()
    const onClick = to ? () => navigate.push(to) : () => navigate.back()
    return (
        <Button variant="contained" color="inherit" startIcon={<ArrowBackIosNewRoundedIcon />} onClick={onClick}>
          Takaisin
        </Button>
    )
}