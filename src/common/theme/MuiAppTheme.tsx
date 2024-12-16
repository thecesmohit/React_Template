import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  ThemeOptions,
  useColorScheme,
  Theme,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";

type CustomeThmeme = 'light' | 'dark' | 'system' | 'natural';


const themes: Record<CustomeThmeme, Theme> = {
  light: createTheme({ palette: { mode: 'light' } }),
  dark: createTheme({ palette: { mode: 'dark' } }),
  system: createTheme({ palette:{mode: 'light'}}),
  natural: createTheme ({
    palette: {
      primary: {
        main: '#228B22', // Forest Green
        light: '#66C266', // Soft Green
        dark: '#145214', // Deep Green
      },
      secondary: {
        main: '#6B8E23', // Olive Drab
        light: '#98FB98', // Pale Green
        dark: '#556B2F', // Dark Olive Green
      },
      text: {
        primary: '#2F4F4F', // Dark Slate Gray
        secondary: '#556B2F', // Dark Olive Green
        disabled: '#A9A9A9', // Light Gray
      },
      background: {
        paper: '#F5FFFA', // Mint Cream
        default: '#E9F3E9', // Soft Green Tint
      },
      error: {
        main: '#D9534F', // Soft Red
        dark: '#A12E2A', // Deep Red
        light: '#F2A6A3', // Light Red
      },
      warning: {
        main: '#E2B93B', // Amber
        light: '#FCDA74', // Pale Yellow
        dark: '#C99F20', // Deep Amber
      },
      info: {
        main: '#5BC0DE', // Soft Blue
        light: '#AEDFF7', // Light Blue Tint
        dark: '#2F8AA8', // Deep Blue
      },
      success: {
        main: '#17A35D', // Vibrant Green
        light: '#51F0A1', // Light Green Tint
        dark: '#04703A', // Deep Green
      },
      divider: '#3C523D', // Olive Tint
    },
  })
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light', // Light mode
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
    background: {
      default: '#ffffff', // Background color for the app
      paper: '#ffffff', // Paper color (for card-like components)
    },
    text: {
      primary: '#000000', // Text color for primary text
      secondary: '#555555', // Text color for secondary text
    },
    divider: '#e0e0e0', // Divider color
    error: {
      main: '#f44336', // Error color
    },
    warning: {
      main: '#ff9800', // Warning color
    },
    info: {
      main: '#2196f3', // Info color
    },
    success: {
      main: '#4caf50', // Success color
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Dark mode
    primary: {
      main: '#90caf9', // Primary color
    },
    secondary: {
      main: '#f48fb1', // Secondary color
    },
    background: {
      default: '#121212', // Background color for the app
      paper: '#1d1d1d', // Paper color (for card-like components)
    },
    text: {
      primary: '#ffffff', // Text color for primary text
      secondary: '#b0b0b0', // Text color for secondary text
    },
    divider: '#333333', // Divider color
    error: {
      main: '#f44336', // Error color
    },
    warning: {
      main: '#ff9800', // Warning color
    },
    info: {
      main: '#2196f3', // Info color
    },
    success: {
      main: '#4caf50', // Success color
    },
  },
});
export const naturalTheme = createTheme({
  palette: {
    primary: {
      main: '#228B22', // Forest Green
      light: '#66C266', // Soft Green
      dark: '#145214', // Deep Green
    },
    secondary: {
      main: '#6B8E23', // Olive Drab
      light: '#98FB98', // Pale Green
      dark: '#556B2F', // Dark Olive Green
    },
    text: {
      primary: '#2F4F4F', // Dark Slate Gray
      secondary: '#556B2F', // Dark Olive Green
      disabled: '#A9A9A9', // Light Gray
    },
    background: {
      paper: '#F5FFFA', // Mint Cream
      default: '#E9F3E9', // Soft Green Tint
    },
    error: {
      main: '#D9534F', // Soft Red
      dark: '#A12E2A', // Deep Red
      light: '#F2A6A3', // Light Red
    },
    warning: {
      main: '#E2B93B', // Amber
      light: '#FCDA74', // Pale Yellow
      dark: '#C99F20', // Deep Amber
    },
    info: {
      main: '#5BC0DE', // Soft Blue
      light: '#AEDFF7', // Light Blue Tint
      dark: '#2F8AA8', // Deep Blue
    },
    success: {
      main: '#17A35D', // Vibrant Green
      light: '#51F0A1', // Light Green Tint
      dark: '#04703A', // Deep Green
    },
    divider: '#3C523D', // Olive Tint
  },
});


export default function MuiAppTheme({ children }: { children: any }){

  return(<>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme/>
        <StyledEngineProvider injectFirst>
          {children}
        </StyledEngineProvider>
    </ThemeProvider>
  </>)
}