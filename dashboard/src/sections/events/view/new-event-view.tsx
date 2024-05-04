import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';
import ErrorView from 'src/components/Error/error-view';
import { BackButton } from 'src/components/buttons/back-button';
import { SaveButton } from 'src/components/buttons/save-button';
import LoadingView from 'src/components/loading/loading-view';
import useDetailedOrganizations from 'src/hooks/api-hooks/useOrganisations';
import EventForm from '../event-form';

// ----------------------------------------------------------------------

const FORMDATA = {
  start_date: new Date(),
  end_date: new Date(),
  title: '',
  extract: '',
  image_id: '',
  visible: false,
  description: '',
  useOrganizationAddress: true,
  address: {
    street: null,
    city: null,
    state: null,
    zipcode: null,
    country: null,
  },
  location: {
    coordinates: [0, 0],
  },
  event_meta: {}
}

export type FormData = typeof FORMDATA


export default function NewEventView() {
  const { data: organization, isLoading, isError } = useDetailedOrganizations()

  const [formData, setFormData] = useState<FormData>(FORMDATA)


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton to='/events' />
        <Stack direction="row" alignItems="center" gap={1}>
          <SaveButton />
        </Stack>
      </Stack>

      {isLoading && organization
        ? <LoadingView />
        : <ErrorBoundary>
          <Card sx={{ p: { xxs: 0, xs: 1, sm: 4 } }}>
            <EventForm
              formData={formData}
              setFormData={setFormData}
              mode='new'
              organization={organization!}
            />
          </Card>
        </ErrorBoundary>}

      {isError && <ErrorView />}
    </Container>
  );
}