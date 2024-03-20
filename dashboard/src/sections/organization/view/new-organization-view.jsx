
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { BackButton } from 'src/components/buttons/back-button';

// ----------------------------------------------------------------------

export default function NewOrganizationView() {

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BackButton />
      </Stack>

      <Card>

      </Card>
    </Container>
  );
}
