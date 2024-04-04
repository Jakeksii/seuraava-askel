
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import Feed from '../Feed';
import { BackButton } from 'src/components/buttons/back-button';

// ----------------------------------------------------------------------

export default function NewEventsView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" gap={2} mb={5}>
      <BackButton />
        <Typography variant="h4">Uusi tapahtuma</Typography>
      </Stack>

      <ErrorBoundary>
      </ErrorBoundary>
    </Container>
  );
}