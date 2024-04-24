import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';
import Feed from '../Feed';
import { BackButton } from 'src/components/buttons/back-button';
import { EditButton } from 'src/components/buttons/edit-button';
import { SaveButton } from 'src/components/buttons/save-button';
import { PublishButton } from 'src/components/buttons/publish-button';
import EventForm from '../event-form';
import useDetailedOrganizations from 'src/hooks/api-hooks/useOrganisations';
import ErrorView from 'src/components/Error/error-view';


// ----------------------------------------------------------------------

export default function NewEventView() {

  const [useOrganizationAddress, setUseOrganizationAddress] = useState(true)
  const { data: organization, isLoading, IsError } = useDetailedOrganizations(useOrganizationAddress)

  const [formData, setFormData] = useState({
    start_date: '',
    end_date: new Date().toISOString(),
    title: "",
    extract: "",
    image_id: '',
    visible: false,
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    event_meta: {}
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton to='/events' />
        <Stack direction="row" alignItems="center" gap={1}>
          <PublishButton />
          <SaveButton />
        </Stack>
      </Stack>

      {isLoading && organization
        ? <LoadingView />
        : <ErrorBoundary>
          <Card sx={{ p: { xs: 1, sm: 4 } }}>
            <EventForm
              formData={formData}
              setFormData={setFormData}
              mode='new'
              onSubmit={handleSubmit}

              useOrganizationAddress={useOrganizationAddress}
              setUseOrganizationAddress={setUseOrganizationAddress}
              organization={organization}
            />
          </Card>
        </ErrorBoundary>}

      {IsError && <ErrorView />}
    </Container>
  );
}