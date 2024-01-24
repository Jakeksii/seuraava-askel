import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';


import { customShadows } from './custom-shadows';
import { overrides } from './overrides';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

// ----------------------------------------------------------------------



export default function ThemeProvider({ children }) {

  const memoizedValue = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
      breakpoints: {
        values: {
          xxs: 0,
          xs: 400,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        }
      }
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
