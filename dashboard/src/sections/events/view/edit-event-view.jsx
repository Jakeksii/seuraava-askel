
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';
import { BackButton } from 'src/components/buttons/back-button';
import { EditButton } from 'src/components/buttons/edit-button';
import { PublishButton } from 'src/components/buttons/publish-button';
import { SaveButton } from 'src/components/buttons/save-button';

// ----------------------------------------------------------------------

export default function EditEventView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton />
        <Stack direction="row" gap={1}>
          <PublishButton />
          <SaveButton />
        </Stack>
      </Stack>

      <ErrorBoundary>
      </ErrorBoundary>
    </Container>
  );
}