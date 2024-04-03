import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import Scrollbar from 'src/components/scrollbar';

import { Link } from 'react-router-dom';
import { useAppContext } from 'src/context/appContext';
import OrganizationTableHead from '../organization-table-head';
import OrganizationTableRow from '../organization-table-row';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows } from '../utils';

// ----------------------------------------------------------------------

export default function SwitchOrganizationView({ organizations }) {

  const { selectedOrganization, switchOrganization } = useAppContext()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const order = 'asc'
  const orderBy = 'name'

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOrganizationSwitch = (organization_id) => {
    switchOrganization(organization_id)
  }

  if (organizations.length <= 0) return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Organisaatiot</Typography>

        <Button variant="contained" color="inherit" component={Link} to={'/organization/new'} startIcon={<AddIcon />}>
          Uusi organisaatio
        </Button>
      </Stack>
      <Card sx={{margin: 'auto', padding: 10}}>
        <Typography pb={2} variant="h4">Sinulla ei ole vielä yhtään organisaatiota!</Typography>
        <Button variant="contained" size='large' component={Link} to={'/organization/new'}>
          Luo uusi organisaatio
        </Button>
      </Card>
    </Container>
  )

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Organisaatiot</Typography>

        <Button variant="contained" color="inherit" component={Link} to={'/organization/new'} startIcon={<AddIcon />}>
          Uusi organisaatio
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrganizationTableHead
                order={order}
                orderBy={orderBy}
                rowCount={organizations.length}
                headLabel={[
                  { id: 'organization_name', label: 'Name' },
                  { id: 'role', label: 'Your role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {organizations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrganizationTableRow
                      key={row._id}
                      selected={selectedOrganization === row.organization_id}
                      organization_id={row.organization_id}
                      name={row.organization_name}
                      role={row.role}
                      isVerified={row.isVerified}
                      onClick={handleOrganizationSwitch}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, organizations.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={organizations.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

SwitchOrganizationView.propTypes = {
  organizations: PropTypes.array
};
