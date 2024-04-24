
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';
import Feed from '../Feed';

// ----------------------------------------------------------------------

export default function EventsView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tapahtuma lista</Typography>

        <Button variant="contained" color="inherit" component={Link} to={'/events/new'} startIcon={<AddIcon />}>
          Uusi tapahtuma
        </Button>
      </Stack>

      <ErrorBoundary>
        <Feed />
      </ErrorBoundary>
    </Container>
  );
}