import { theme } from "./utils/theme";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Layout from "./components/layout";
import { ThemeProvider } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SnackbarUtilsConfigurator } from "./components/layout/snackBarUtil";
import { SnackbarProvider } from "notistack";
import Pages from "./components/pages";
import { userServices } from "./utils/api/user/services";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserContextType {
  setIsSignedIn: Dispatch<SetStateAction<boolean|null>> | null;
  setUser: Dispatch<SetStateAction<any>> | null;
  isSignedIn: boolean|null;
  user: any;
  stakes: { [x: string]: number };
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
export const UserContext = createContext<UserContextType>({
  isSignedIn: null,
  user: null,
  setIsSignedIn: null,
  setUser: null,
  stakes: defaultStake,
});


function App() {
  const [isSignedIn, setIsSignedIn] = useState<null|boolean>(null);
  const [user, setUser] = useState(null);

  const [stakes, setButtonValue] = React.useState<{ [x: string]: number }>(
    defaultStake
  );

  const handleChange = (e: any) => {
    const buttons = { ...stakes };
    setButtonValue({ ...buttons, [e.target.name]: e.target.value });
  };

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
      <SnackbarProvider autoHideDuration={1500}>
        <div className="App">
          <UserContext.Provider
            value={{ stakes,isSignedIn, user, setIsSignedIn, setUser }}
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
