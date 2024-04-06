
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import Feed from '../Feed';
import { BackButton } from 'src/components/buttons/back-button';
import { EditButton } from 'src/components/buttons/edit-button';

// ----------------------------------------------------------------------

export default function NewEventView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton to='/events' />
      </Stack>

      <ErrorBoundary>
      </ErrorBoundary>
    </Container>
  );
}