import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  // useThemeProps,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { colorHex } from "../../../utils/constants";
import Loading from "../loading";
import { authServices } from "../../../utils/api/auth/services";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { FormikErrors } from "formik";

interface Props {
  loading: boolean;
  values: {
    userId: string;
    password: string;
    checked: boolean;
  };
  errors: FormikErrors<{
    userId: string;
    password: string;
    checked: boolean;
    appUrl: string;
  }>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
}

function LoginForm({
  handleChange,
  values,
  handleSubmit,
  loading,
  reset,
  errors,
}: Props) {
  const theme = useTheme();
  const nav = useNavigate();
  const { setUser, setModal, setIsSignedIn, appData } = useContext(UserContext);
  const handleDemoUserLogin = async () => {
    const { response } = await authServices.demoUserLogin(
      window.location.hostname
    );
    if (response) {
      localStorage.setItem("is_demo", "true");
      localStorage.setItem("token", response.token);
      if (setUser) setUser(response);
      localStorage.setItem("userType", response.userTypeInfo);
      localStorage.setItem("user", JSON.stringify(response));
      if (response.passwordtype === "old" && setModal) {
        setModal({ changePassword: true });
        nav({
          pathname: "/",
          search: "first-login=true",
        });
      } else {
        if (setIsSignedIn) setIsSignedIn(true);
      }
    }
  };
  useEffect(() => {
    return () => reset();
  }, []);
  return (
    <Box position="relative">
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 200000 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
          top="0"
          right="0"
        >
          <Loading />
        </Box>
      )}
      <Box bgcolor="black" borderRadius={2} p={2} mt={2}>
        <form
          onSubmit={handleSubmit}
          style={{
            gap: "15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography fontWeight={700}>
            UserName
            <TextField
              placeholder="Enter Username"
              fullWidth
              margin="dense"
              sx={{}}
              InputProps={{
                sx: {
                  mt: -0.3,
                  bgcolor: colorHex.bg4,
                },
              }}
              required
              name="userId"
              value={values.userId.trimStart()}
              onChange={handleChange}
              error={!!errors.userId}
              helperText={errors.userId}
            />
          </Typography>
          <Typography fontWeight={700}>
            Password
            <TextField
              placeholder="Enter Password"
              fullWidth
              margin="dense"
              InputProps={{
                sx: {
                  mt: -0.3,
                  bgcolor: colorHex.bg4,
                },
              }}
              required
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <a
              href="https://wa.me/17168156061"
              target={"_blank"}
              rel="noreferrer"
              style={{
                display: "block",
                fontSize: "0.8rem",
                textAlign: "right",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Forgot Password ?
            </a>
          </Typography>
          <Form.Check
            name="checked"
            onChange={handleChange}
            checked={values.checked}
            type="checkbox"
            label={
              <Typography ml={0.5} color="white" variant="caption">
                I am at least 18 years of age and I have read, accept and agree
                to the Terms and Conditions , Responsible Gaming, GamCare,
                Gambling Therapy
              </Typography>
            }
          />
          <Button
            sx={{
              p: 2.5,
            }}
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>

          {appData?.isDemoIdLoginAllowed && (
            <Button
              sx={{ p: 2.5 }}
              variant="contained"
              color="secondary"
              type="button"
              fullWidth
              onClick={handleDemoUserLogin}
            >
              Login With Demo Id
            </Button>
          )}
          <Typography fontSize={"0.5rem"}>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

 export default React.memo(LoginForm);