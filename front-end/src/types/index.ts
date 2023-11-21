declare module "@mui/material" {
    interface TypeText {
      primaryDark: string;
      secondaryLight: string;
      secondaryDark: string;
      certificateDark: string;
      certificateExtraDark: string;
      white: string;
      black: string;
      red: string;
    }
  
    // createTheme uses ThemeOptions as argument type which uses PaletteOptions as type for palette property
    interface PaletteOptions {
      custom: {
        backdrop: string;
        shadow: string;
        disabled: string;
      };
      bg: {
        main: string;
        light: string;
        dark: string;
        pagination: string;
      };
      border: {
        primary: string;
        primaryDark: string;
        secondary: string;
        tertiary: string;
        certificate: string;
      };
      tree: {
        l1: string;
        l2: string;
        r1: string;
        r2: string;
        shadow: string;
        bud: string;
      };
      addAlpha: (hex: string, opacity: number) => string;
    }
  
    // The 'Theme' type Theme type which uses Palette as type for palette property
    // so we have to modify both PaletteOptions and Palette for better linting and code completion
    interface Palette {
      custom: {
        backdrop: string;
        shadow: string;
        disabled: string;
      };
      bg: {
        main: string;
        light: string;
        dark: string;
        pagination: string;
      };
      border: {
        primary: string;
        primaryDark: string;
        secondary: string;
        tertiary: string;
        certificate: string;
      };
      tree: {
        l1: string;
        l2: string;
        r1: string;
        r2: string;
        shadow: string;
        bud: string;
      };
      addAlpha: (hex: string, opacity: number) => string;
    }
  }
  
  declare module "@mui/system" {
    interface Shape {
      containerRadius: string;
    }
  }
  
  export {};
  
  