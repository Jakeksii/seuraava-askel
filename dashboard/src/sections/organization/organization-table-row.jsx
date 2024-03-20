import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function OrganizationTableRow({
  selected,
  organization_id,
  name,
  role,
  isVerified,
  onClick
}) {

  return (
      <TableRow hover tabIndex={-1} selected={selected}>
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
          <Button variant='outlined' disabled={selected} onClick={() => onClick(organization_id)}>Hallinnoi</Button>
        </TableCell>
      </TableRow>
  );
}

OrganizationTableRow.propTypes = {
  onClick: PropTypes.func,
  isVerified: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
  organization_id: PropTypes.string,
  selected: PropTypes.bool
};
