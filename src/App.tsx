import { theme } from "./utils/theme";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./components/accountSummary/formCheck.css";
import "./App.css";
import { Alert, Box, Snackbar, ThemeProvider } from "@mui/material";
import { SnackbarUtilsConfigurator } from "./components/layout/snackBarUtil";
import { SnackbarProvider } from "notistack";
import { userServices } from "./utils/api/user/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { sportServices } from "./utils/api/sport/services";
import { SportInterface } from "./components/layout/Sidebar";
import "./components/font.css";
import { authServices } from "./utils/api/auth/services";
import { utilServices } from "./utils/api/util/services";
import { BalanceDataInterface } from "./components/layout/user/UserBox";
import { LoadingBallSvg } from "./components/loadingBall/loadingBall";
import { useLocation } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";
import { qTechServices } from "./utils/api/qTechGames/services";
import { Approval } from "@mui/icons-material";
import { FooterImageInterface } from "./components/layout/Footer";

const Pages = React.lazy(() => import("./components/pages"));
const CustomizedDialogPassword = React.lazy(
  () => import("./components/layout/user/ResetPasswordDailog")
);

export const CasinoType1 = 323334;
export const CasinoType2 = 323335;

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
  userIp: string;
  footerData?: FooterImageInterface;
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
  isDemoIdLoginAllowed: boolean;
  selfAllowed: boolean;
  casinoComm: number;
  fancyComm: number;
  oddsComm: number;
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
  userIp: "",
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

  const [userIp, setUserIp] = useState("");
  const [dheerajOpen, setDheerajOpen] = useState(false);

  useEffect(() => {
    const getIpy = async () => {
      const { response: ipRes } = await utilServices.getIpfy();
      setUserIp(ipRes.ip);
    };
    getIpy();
  }, [isSignedIn]);

  const getBalance = useCallback(async () => {
    if (!isSignedIn) return;
    const { response } = await userServices.balance();
    if (response?.data) {
      setBalanceData(response.data);
    }
  }, [isSignedIn]);

  const [error, setError] = useState(false);
  const [activeEventList, setActiveEventList] = useState<SportInterface[]>([]);
  const [appData, setAppData] = useState<AppDataInterface | null>(null);

  errorRef = error;
  setErrorRef = setError;

  const getSelfAllowed = async () => {
    const { response } = await authServices.isSelfAllowed({
      appUrl: window.location.hostname.replace("www.", ""),
    });

    if (response?.data) {
      setAppData(response.data);
    }
  };

  const showAndHideHandler = () => {
    setDheerajOpen((o) => !o);
  };

  const validateJwt = useCallback(async () => {
    const { response } = await utilServices.validateToken();
    const user = localStorage.getItem("user");
    if (response?.status && user && !isSignedIn) {
      setUser(JSON.parse(user));
      setIsSignedIn(true);
    }
  }, [isSignedIn]);

  const authenticationHandler = async () => {
    if (isSignedIn) {
      const { response } = await qTechServices.authentication();
      if (!!response && response?.data && response?.data?.access_token) {
        const { access_token } = response?.data;
        window.localStorage.setItem("qtech_access_token", access_token);
      }
    }
  };
  const [footerData, setFooterData] = useState<FooterImageInterface>();
  useEffect(() => {
    const getFooterData = async () => {
      const { response } = await utilServices.footerImages();
      if (response) {
        setFooterData(response.data);
      }
    };
    getFooterData();
  }, []);
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
  const appRef = useRef<HTMLAnchorElement | null>(null);
  const getButtonValue = async () => {
    const { response } = await userServices.getButtonValue();
    if (response?.data) {
      setButtonValue(response.data);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    let timer: ReturnType<typeof setInterval>;
    if (user) {
      if (["sign-in", "sign-up"].every((i) => !pathname.includes(i))) {
        validateJwt();
        timer = setInterval(() => validateJwt(), 1000);
      }
    } else {
      setIsSignedIn(false);
    }
    return () => clearInterval(timer);
  }, [pathname, validateJwt, isSignedIn]);

  useEffect(() => {
    const time = setInterval(() => {
      getBalance();
      authenticationHandler();
    }, 5000);
    return () => clearInterval(time);
  }, [isSignedIn, getBalance]);

  useEffect(() => {
    if (isSignedIn) {
      getButtonValue();
      getBalance();
      authenticationHandler();
    }

    return () => {
      setButtonValue(defaultStake);
    };
  }, [isSignedIn, getBalance]);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (appRef?.current) {
        appRef.current.style.top = `calc( ${window.scrollY}px + 50vh)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
              footerData,
              balance: balanceData,
              getBalanceData: getBalance,
              activeEventList,
              stakes,
              userIp,
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
            <NewRules />

            <Box display="none">
              <CustomizedDialogPassword />
            </Box>
            <Pages />
          </UserContext.Provider>
          <iframe
            style={{ display: dheerajOpen ? "flex" : "none" }}
            className={"_iframe"}
            title="dhee_iframe"
            src="http://15.207.226.246:10004?clientId=1a07c68d-1c26-43d1-880b-3a9e5deb2e93"
          />
          {!isSignedIn && (
            <a
              ref={appRef}
              href={footerData?.s_whatsapp.link}
              className="whatsapp-fixed"
            >
              <div className="whatsapp-text">
                <span>Get an ID Instantly on Whatsapp</span>{" "}
                <span>Click Here Now</span>
              </div>
              <img alt="whatsapp" src="/assets/images/images.png"></img>
            </a>
          )}

          <Box
            className={`chat_icon_div shadow`}
            sx={{ bgcolor: "secondary.main" }}
            onClick={showAndHideHandler}
          >
            <FaHeadphones className="text-white" />
          </Box>
        </div>
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export const NewRules = () => {
  useEffect(() => {
    console.log("Ran new");
  }, []);
  return <></>;
};
export default App;
