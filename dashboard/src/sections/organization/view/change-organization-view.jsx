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

import { useAppContext } from 'src/context/appContext';
import useCurrentUser from 'src/hooks/api-hooks/useCurrentUser';
import { useRouter } from 'src/routes/hooks';
import OrganizationTableHead from '../organization-table-head';
import OrganizationTableRow from '../organization-table-row';
import TableEmptyRows from '../table-empty-rows';
import { applyFilter, emptyRows, getComparator } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ChangeOrganizationView() {
  // GET CURRENT USER DATA
  const token = useAppContext().session.token
  const { data: currentUser } = useCurrentUser({ token })

  const navigate = useRouter()

  const [page, setPage] = useState(0);
 

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataFiltered = applyFilter({
    inputData: [],
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const OrganizationTableContent = currentUser?.organizations && (
    <>
      <OrganizationTableHead
        order={order}
        orderBy={orderBy}
        rowCount={currentUser.organizations.length}
        onRequestSort={handleSort}
        headLabel={[
          { id: 'organization_name', label: 'Name' },
          { id: 'role', label: 'Your role' },
          { id: 'isVerified', label: 'Verified', align: 'center' },
          { id: '' },
        ]}
      />
      <TableBody>
        {dataFiltered
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <OrganizationTableRow
              key={row.id}
              name={row.name}
              role={row.role}
              isVerified={row.isVerified}
              handleClick={(event) => handleClick(event, row.name)}
            />
          ))}

        <TableEmptyRows
          height={77}
          emptyRows={emptyRows(page, rowsPerPage, currentUser.organizations.length)}
        />
      </TableBody>
    </>
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

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={0}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
