import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Button from '@mui/material/Button';
import { useRouter } from 'src/routes/hooks';

export function BackButton() {
    const navigate = useRouter()
    return (
        <Button variant="contained" color="inherit" startIcon={<ArrowBackIosNewRoundedIcon />} onClick={() => navigate.back()}>
          Takaisin
        </Button>
    )
}