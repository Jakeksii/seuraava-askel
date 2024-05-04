import { useState } from 'react';
import { useQueryClient } from "react-query";
import { useCreateOrganization } from 'src/hooks/api-hooks/useOrganisations';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { useSnackbar } from 'notistack';
import { BackButton } from 'src/components/buttons/back-button';
import { PublishButton } from 'src/components/buttons/publish-button';
import { useRouter } from 'src/routes/hooks';
import OrganizationForm from '../organization-form';
// variant could be success, error, warning, info, or default

// ----------------------------------------------------------------------

export default function NewOrganizationView() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useCreateOrganization()

  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: '',
    business_id: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    contact_info: {
      visible: true,
      email: '',
      phone: '',
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
        enqueueSnackbar('Uusi organisaatio luotu!', {
          variant: 'success', anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
        router.push('/organization/switch')
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: 'error', anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
      }
    }
    )
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton />
        <PublishButton
          loading={isLoading}
          formId='organization-form' />
      </Stack>

      <Card>
        <Box m={4}>
          <OrganizationForm
            mode="new"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit} />
        </Box>
        <Box m={4}>
          <PublishButton
            loading={isLoading}
            fullwidth
            formId='organization-form' />
        </Box>
      </Card>
    </Container>
  );
}
