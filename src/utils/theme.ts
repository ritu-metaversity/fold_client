
import { createTheme } from "@mui/material";
export const font = '"Noto Sans"';
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 580,
      md: 768,
      lg: 1280,
      xl: 1600,
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#23292D",
      paper: "#17191C",
    },
    primary: {
      main: "#fdcf13",
    },
    secondary: {
      main: "#03B37F",
    },
    text: {
      primary: "#aaafb5",
      secondary: "#aaafb5",
    },
  },
  typography: {
    fontFamily: font,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#23292D",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "none !important",
          backgroundColor: "#23292D",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});
  