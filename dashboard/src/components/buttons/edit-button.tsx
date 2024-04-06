import Button from '@mui/material/Button';
import { useRouter } from 'src/routes/hooks';

export function EditButton({ to }: {to: string}) {
    const navigate = useRouter()
    return (
        <Button variant="contained" color="primary" onClick={() => navigate.push(to)}>
          Muokkaa
        </Button>
    )
}