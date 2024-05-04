
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';
import { BackButton } from 'src/components/buttons/back-button';
import { EditButton } from 'src/components/buttons/edit-button';

// ----------------------------------------------------------------------

export default function EventView() {
  // Get event id from url
  const { _id } = useParams()
  const state = 0

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton to='/events' />
        <Stack direction="row" gap={1}>
          <Select
            size='small'
            value={state}
          >
            <MenuItem value={0}>Luonnos</MenuItem>
            <MenuItem value={1}>Julkaistu</MenuItem>
          </Select>
          <EditButton to={'edit'} />
        </Stack>
      </Stack>

      <ErrorBoundary>
        {_id}
      </ErrorBoundary>
    </Container>
  );
}