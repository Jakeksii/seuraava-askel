
import { CircularProgress, Stack } from '@mui/material';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export default function LoadingView() {

    return (
        <Container margin='auto' aria-busy>
            <Stack alignItems='center' >
                <CircularProgress />
            </Stack>
        </Container>
    );
}
