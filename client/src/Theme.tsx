import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
    palette: {
        primary: { //https://coolors.co/palette/FFE8D6-DDBEA9-CB997E
            light: "#5c7876",
            main: '#455e5d',
            dark: '#1f2b2a',
            contrastText: '#fff',
        },
        secondary: { //https://coolors.co/palette/B7B7A4-A5A58D-6B705C
            light: '#f6fff8',
            main: '#A5A58D',
            dark: '#B7B7A4'
        },
        info: { //https://coolors.co/palette/f6fff8-eaf4f4-cce3de
            light: '#ffff',
            main: '#f5cca8',
            dark: '#B7B7A4'
        },

        success: { //https://coolors.co/palette/73A942-538D22-245501
            light: '#73A942',
            main: '#538D22',
            dark: '#245501',
        },
        error: { //https://coolors.co/palette/AD2831-800E13-640D14
            light: '#AD2831',
            main: '#800E13',
            dark: '#640D14',
        },
        warning: { //https://coolors.co/palette/FFDA3D-FDC43F-FDB833
            light: '#FFDA3D',
            main: '#FDC43F',
            dark: '#FDB833',
        }
    },
    typography: {
        button: {
            textTransform: 'none',
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 820,
            lg: 1200,
            xl: 1536,
        }
    }
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    )
}

