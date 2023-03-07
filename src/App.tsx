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
import { Alert, Box, Snackbar, ThemeProvider } from "@mui/material";
import { SnackbarUtilsConfigurator } from "./components/layout/snackBarUtil";
import { SnackbarProvider } from "notistack";
import Pages from "./components/pages";
import { userServices } from "./utils/api/user/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { sportServices } from "./utils/api/sport/services";
import { SportInterface } from "./components/layout/Sidebar";
import "./components/font.css";
import { authServices } from "./utils/api/auth/services";
import CustomizedDialogPassword from "./components/layout/user/ResetPasswordDailog";
import { utilServices } from "./utils/api/util/services";
import { BalanceDataInterface } from "./components/layout/user/UserBox";
import { LoadingBallSvg } from "./components/loadingBall/loadingBall";

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
  getButtonValue: () => Promise<void>;
  activeEventList: SportInterface[] | null;
  appData: AppDataInterface | null;
  balance: BalanceDataInterface | null;
  announcement: string;
  casinoId: number;
  setCasinoId?: Dispatch<SetStateAction<number>>;
  getBalanceData: () => Promise<void>;
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
  getButtonValue: async () => {},
  activeEventList: null,
  appData: null,
  balance: null,
  announcement: "",
  casinoId: 1,
  getBalanceData: async () => {},
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [modal, setModal] = useState<ModalState>({ login: false });
  const [casinoId, setCasinoId] = useState<number>(323334);
  const [stakes, setButtonValue] = React.useState<{ [x: string]: number }>(
    defaultStake
  );
  const [balanceData, setBalanceData] = useState<BalanceDataInterface | null>(
    null
  );

  const getBalance = async () => {
    if (!isSignedIn) return;
    const { response } = await userServices.balance();
    if (response?.data) {
      setBalanceData(response.data);
    }
  };
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

  const validateJwt = async () => {
    const { response } = await utilServices.validateToken();
    const user = localStorage.getItem("user");
    if (response?.status && user) {
      setUser(JSON.parse(user));
      setIsSignedIn(true);
    } else {
      setUser(null);
      setIsSignedIn(false);
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
    const getAnnouncement = async () => {
      const { response } = await utilServices.marqueeMessage();
      if (response) {
        setAnnouncement(response.message);
      }
    };
    getAnnouncement();
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
      validateJwt();
    } else {
      setIsSignedIn(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      getBalance();
    }, 1000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      getButtonValue();
      getBalance();
    }

    return () => {
      setButtonValue(defaultStake);
    };
  }, [isSignedIn]);
  // fetch("http://192.168.0.245:8000/group/get-groups-chats");
  if (isSignedIn === null) {
    return <LoadingBallSvg />;
  }
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
              balance: balanceData,
              getBalanceData: getBalance,
              activeEventList,
              stakes,
              getButtonValue,
              isSignedIn,
              announcement,
              casinoId,
              setCasinoId,
              user,
              appData,
              modal,
              setModal,
              setIsSignedIn,
              setUser,
            }}
          >
            <Layout>
              {/* {!isSignedIn && ( */}
              <Box display="none">
                <CustomizedDialogPassword />
              </Box>
              {/* )} */}
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
