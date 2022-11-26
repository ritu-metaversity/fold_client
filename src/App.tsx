import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
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
    secondary: {
      main: "#03B37F",
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

interface UserContextType {
  setIsSignedIn: Dispatch<SetStateAction<boolean>> | null;
  setUser: Dispatch<SetStateAction<any>> | null;
  isSignedIn: boolean;
  user: any;
}

export const UserContext = createContext<UserContextType>({
  isSignedIn: false,
  user: null,
  setIsSignedIn: null,
  setUser: null,
});
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user));
      setIsSignedIn(true);
    } else {
      setUser(null);
      setIsSignedIn(false);
    }
    return () => {

    }
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={1500}>
        <div className="App">
          <UserContext.Provider
            value={{ isSignedIn, user, setIsSignedIn, setUser }}
          >
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
