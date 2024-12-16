import '@mui/material/styles';

// Extend the Palette interface
declare module '@mui/material/styles' {
  interface Palette {
    mode: 'light' | 'dark' | 'system' | 'natural'; // Add "natural" mode
    mode: PaletteMode | 'natural';
  }
  interface PaletteOptions {
    mode?: 'light' | 'dark' | 'system' | 'natural';
    mode?: PaletteMode | 'natural';
  }

}