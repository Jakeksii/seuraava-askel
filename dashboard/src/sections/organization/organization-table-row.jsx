import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function OrganizationTableRow({
  name,
  role,
  isVerified,
  handleClick,
}) {

  return (
      <TableRow hover tabIndex={-1} onClick={handleClick}>
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell align="right">
          <Button variant='outlined'>Hallinnoi</Button>
        </TableCell>
      </TableRow>
  );
}

OrganizationTableRow.propTypes = {
  handleClick: PropTypes.func,
  isVerified: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
};
