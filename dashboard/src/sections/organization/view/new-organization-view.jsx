import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { BackButton } from 'src/components/buttons/back-button';
import OrganizationForm from '../organization-form';

// ----------------------------------------------------------------------

export default function NewOrganizationView() {

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton />
      </Stack>

      <Card>
        <OrganizationForm mode="new" formData={formData} setFormData={setFormData} />
      </Card>
    </Container>
  );
}
