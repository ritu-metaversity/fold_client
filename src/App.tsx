import React, { createContext, useState } from "react";
import "./App.css";
import Layout from "./components/layout";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Home from "./components/home";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SnackbarUtilsConfigurator } from "./components/layout/snackBarUtil";
import { SnackbarProvider } from "notistack"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#23292D",
      paper: "#17191C",
    },
    primary: {
      main: "#fdcf13",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#23292D",
          paddingInline:"0px",
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

export const UserContext = createContext({ isSignedIn: false });
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider >
      <div className="App">
        <UserContext.Provider value={{ isSignedIn }}>
          <Layout>
            
            <Home />
          </Layout>
        </UserContext.Provider>
      </div>
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
