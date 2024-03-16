
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import Scrollbar from 'src/components/scrollbar';

import { useAppContext } from 'src/context/appContext';
import useCurrentUser from 'src/hooks/api-hooks/useCurrentUser';
import { BackButton } from 'src/components/buttons/back-button';

// ----------------------------------------------------------------------

export default function NewOrganizationView() {
  // GET CURRENT USER DATA
  const token = useAppContext().session.token
  const { data: currentUser } = useCurrentUser({ token })

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
