import { createTheme,Theme } from "@mui/material";

export const LightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#306F54",
      light: "#1A9035",
    },
    text: {
      primary: "#1A9035",
      primaryDark: "#306F54",
      secondary: "#686868",
      secondaryLight: "#777777",
      secondaryDark: "#1E1E1E",
      certificateDark: "#323232",
      certificateExtraDark: "#0D0D0D",
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000",
      //red-shades => theme.palette.addAlpha(theme.palette.text.red, <alpha-value>)
    },
    border: {
      primary: "#1A9035",
      //primary-shades => theme.palette.addAlpha(theme.palette.border.primary, <alpha-value>)
      primaryDark: "#306F54",
      secondary: "#686868",
      //secondary-shades => theme.palette.addAlpha(theme.palette.border.secondary, <alpha-value>)
      tertiary: "#E7E59A",
      certificate: "#404040",
    },
    warning: {
      main: "#FDCA17",
    },
    custom: {
      backdrop: "#deefe97c",
      shadow: "#000000",
      disabled: "#B3B3B3",
      //shadow-shades => theme.palette.addAlpha(theme.palette.custom.shadow, <alpha-value>)
    },
    bg: {
      main: "#FFFFFF",
      light: "#DEEFE9",
      dark: "#C1E1D6",
      pagination: "#CED6E0",
    },
    tree: {
      l1: "#1A9035",
      l2: "#D8C411",
      r1: "#4DC82F",
      r2: "#B2A20F",
      shadow: "#686868",
      bud: "#2B9C03",
    },
    // returns hex value with opacity added
    addAlpha: (hex, opacity) => {
      let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return hex + _opacity.toString(16).toUpperCase();
    },
  },

  typography: {
    // fontFamily: "'Poppins', 'sans-serif'",
  },
  shape: {
    containerRadius: "20px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: ({ theme }) => {
          return {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.white,
            textTransform: "capitalize",
            padding: ".4rem 1.2rem",
            borderRadius: "10px",
            whiteSpace: "nowrap",

            "&:hover": {
              backgroundColor: theme.palette.addAlpha(theme.palette.primary.light, 0.75),
            },
          };
        },
      },
    },
  },
});
