import { theme } from "./utils/theme";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import "./components/accountSummary/formCheck.css";
import "./App.css";
import Layout from "./components/layout";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SnackbarUtilsConfigurator } from "./components/layout/snackBarUtil";
import { SnackbarProvider } from "notistack";
import Pages from "./components/pages";
import { userServices } from "./utils/api/user/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { sportServices } from "./utils/api/sport/services";
import { SportInterface } from "./components/layout/Sidebar";
import "./components/font.css";
import { authServices } from "./utils/api/auth/services";

interface ModalState {
  login?: boolean;
  register?: boolean;
  changePassword?: boolean;
}
interface UserContextType {
  setIsSignedIn: Dispatch<SetStateAction<boolean | null>> | null;
  setUser: Dispatch<SetStateAction<any>> | null;
  setModal: Dispatch<SetStateAction<ModalState>> | null;
  isSignedIn: boolean | null;
  modal: ModalState;
  user: any;
  stakes: { [x: string]: number };
  activeEventList: SportInterface[] | null;
  appData: AppDataInterface | null;
}

const defaultStake = {
  stack1: 0,
  stack2: 0,
  stack3: 0,
  stack4: 0,
  stack5: 0,
  stack6: 0,
  stack7: 0,
  stack8: 0,
  stack9: 0,
  stack10: 0,
};

interface AppDataInterface {
  logo: string;
  mobileLogo: string;
  selfAllowed: boolean;
}

export let setErrorRef: any;
export let errorRef: any;

export const UserContext = createContext<UserContextType>({
  isSignedIn: null,
  user: null,
  setIsSignedIn: null,
  modal: { login: false },
  setUser: null,
  setModal: null,
  stakes: defaultStake,
  activeEventList: null,
  appData: null,
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState<ModalState>({ login: false });
  const [stakes, setButtonValue] = React.useState<{ [x: string]: number }>(
    defaultStake
  );

  const [error, setError] = useState(false);
  const [activeEventList, setActiveEventList] = useState<SportInterface[]>([]);
  const [appData, setAppData] = useState<AppDataInterface | null>(null);

  errorRef = error;
  setErrorRef = setError;

  const getSelfAllowed = async () => {
    const { response } = await authServices.isSelfAllowed({
      // appUrl: "11hub.atozscore1234.com",
      appUrl: window.location.hostname,
    });

    if (response?.data) {
      setAppData(response.data);
    }
  };

  useEffect(() => {
    const getNewEventOpen = async () => {
      const { response } = await sportServices.leftMenu();
      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
        }
      } else {
        setActiveEventList([]);
      }
    };
    getSelfAllowed();
    getNewEventOpen();
  }, []);

  const getButtonValue = async () => {
    const { response } = await userServices.getButtonValue();
    if (response?.data) {
      setButtonValue(response.data);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsSignedIn(true);
    } else {
      setUser(null);
      setIsSignedIn(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (isSignedIn) getButtonValue();
    return () => {
      setButtonValue(defaultStake);
    };
  }, [isSignedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={error}
        message="Error /n You seem to be offline!"
        color="error"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="error">
          Error! You seem to be offline.
        </Alert>
      </Snackbar>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* <NewLoading /> */}
        <div className="App">
          <UserContext.Provider
            value={{
              activeEventList,
              stakes,
              isSignedIn,
              user,
              appData,
              modal,
              setModal,
              setIsSignedIn,
              setUser,
            }}
          >
            <Layout>
              <Pages />
            </Layout>
          </UserContext.Provider>
        </div>
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
