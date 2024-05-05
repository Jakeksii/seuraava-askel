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
import { usePublishEvent } from 'src/hooks/api-hooks/useEvents';
import { enqueueSnackbar } from 'notistack';

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
  const { mutate } = usePublishEvent()

  const [formData, setFormData] = useState<FormData>(FORMDATA)

  const publish = () => {
    const u = formData.useOrganizationAddress
    const data = {
      ...formData,
      start_date: formData.start_date.toISOString(),
      end_date: formData.end_date.toISOString(),
      address: {
        street: u ? organization?.address.street : formData.address.street,
        city: u ? organization?.address.city : formData.address.city,
        state: u ? organization?.address.state : formData.address.state,
        zipcode: u ? organization?.address.zipcode : formData.address.zipcode,
        country: u ? organization?.address.country : formData.address.country
      },
      location: {
        coordinates: u ? organization?.location.coordinates : formData.location.coordinates
      }
    }

    /* eslint-disable-next-line */
    mutate(data as any, {
      onSuccess: () => {
        enqueueSnackbar('Tapahtuma julkaistu!', {
          variant: 'success', anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
      },
      /* eslint-disable-next-line */
      onError: (error: any) => {
        enqueueSnackbar(error.message, {
          variant: 'error', anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
      }
    })
  }
  const save = () => {
    publish()
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton to='/events' />
        <Stack direction="row" alignItems="center" gap={1}>
          <SaveButton onClick={save} />
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
              publish={publish}
              save={save}
            />
          </Card>
        </ErrorBoundary>}

      {isError && <ErrorView />}
    </Container>
  );
}