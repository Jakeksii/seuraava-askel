import PropTypes from 'prop-types';
import { useMemo, useState, createContext } from "react";

export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: "light"
});

export default function ColorModeContextProvider({ children }) {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        mode,
      }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        {children}
      </ColorModeContext.Provider>
    );
  }

  ColorModeContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }