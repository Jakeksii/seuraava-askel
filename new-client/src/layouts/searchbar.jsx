import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { bgBlur } from 'src/theme/css';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: HEADER_MOBILE,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {

  return (
    <div>
      <StyledSearchbar>
        <Input
          autoFocus
          fullWidth
          disableUnderline
          placeholder="Search…"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
        />

      </StyledSearchbar>
    </div>
  );
}
