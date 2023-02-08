import LoginForm from "./LoginForm";
import {
  Box,
  CircularProgress,
  // Button,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./auth.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomizedDialogs from "../../common/Dailog";
import { LoginButton, UserContainer } from "../styledComponents";
import { FaInfo } from "react-icons/fa";
import { useFormik } from "formik";
import { authServices } from "../../../utils/api/auth/services";
import { UserContext } from "../../../App";
import { Form } from "react-bootstrap";
import snackBarUtil from "../snackBarUtil";
import { RegisterForm } from "./RegisterForm";
import CustomizedDialogPassword from "./ResetPasswordDailog";

export function AuthBox() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { setIsSignedIn, appData, isSignedIn, setUser, modal, setModal } =
    useContext(UserContext);
  const nav = useNavigate();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: "",
      password: "",
      checked: true,
    },
    onSubmit: async () => {
      if (!values.checked) {
        snackBarUtil.error("Please agree Terms and Conditions");
        return;
      }
      setLoading(true);
      const { response } = await authServices.login(values);
      if (response) {
        if (response.passwordtype === "old" && setModal) {
          setModal({ changePassword: true });
          setLoading(false);
          nav({
            pathname: "/",
            search: "first-login=true",
          });
          localStorage.setItem("token", response.token);
        } else {
          localStorage.setItem("token", response.token);
          if (setIsSignedIn) setIsSignedIn(true);
        }
        if (setUser) setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
      }
      setLoading(false);
    },
  });
  const textFieldProps = {
    // variant: "outlined",
    sx: {
      borderRadius: 0,
      "& fieldset": { outline: "none", border: "none", padding: 0 },
      border: "1px solid white",
      height: "2rem",
    },
    required: true,
    inputProps: {
      style: {
        maxWidth: "11.5rem",
        padding: "0.2rem 0.8rem",
      },
    },
    onChange: handleChange,
  };
  const matches = useMediaQuery("(max-width:1280px)");
  const handleClose = () => {
    setModal && setModal({ login: false, register: false });
  };

  console.log(values, "val");
  return (
    <UserContainer>
      {!isSignedIn && (
        <Box display="none">
          <CustomizedDialogPassword />
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "0.2rem", lg: "0.5rem" },
            marginLeft: { sm: "1rem" },
          }}
        >
          {appData?.selfAllowed && (
            <LoginButton
              variant="contained"
              onClick={() => {
                setModal && setModal({ register: true });
              }}
            >
              REGISTER
            </LoginButton>
          )}
          <Box
            display={{
              xs: "none",
              lg: "block",
            }}
          >
            <TextField
              placeholder="Username*"
              {...textFieldProps}
              variant="outlined"
              size="small"
              name="userId"
              value={values.userId}
              onChange={handleChange}
            />
            <a
              href="https://wa.me/17168156061"
              target={"_blank"}
              rel="noreferrer"
              style={{
                display: "block",
                fontSize: "0.7rem",
                textAlign: "right",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Forgot Password ?
            </a>
          </Box>
          <Box
            display={{
              xs: "none",
              lg: "block",
            }}
          >
            <TextField
              placeholder="Password*"
              name="password"
              type="password"
              variant="outlined"
              size="small"
              value={values.password}
              {...textFieldProps}
            />
            <Form.Check
              name="checked"
              checked={values.checked}
              onChange={handleChange}
              type="checkbox"
              className="checkBoxInLogin"
              label={
                <Typography
                  component="span"
                  fontSize={{ lg: "0.75rem" }}
                  sx={{ verticalAlign: "top" }}
                  my={0}
                >
                  I agree Terms & Conditions.
                  <Tooltip title="I am at least 18 years of age and I have read, accept and agree to the Terms and Conditions , Responsible Gaming , GamCare, Gambling Therapy">
                    <Box component="span">
                      <FaInfo />
                    </Box>
                  </Tooltip>
                </Typography>
              }
            />
          </Box>
          <LoginButton
            startIcon={
              loading ? (
                <CircularProgress size={"0.8em"} color="error" />
              ) : undefined
            }
            variant="contained"
            type={matches ? "reset" : "submit"}
            onClick={() => {
              if (matches) {
                setModal && setModal({ login: true });
              }
            }}
          >
            LOGIN
          </LoginButton>
        </Box>
      </form>
      <CustomizedDialogs
        title="Login"
        maxWidth="xs"
        open={Boolean(modal.login)}
        handleClose={handleClose}
      >
        <LoginForm
          loading={loading}
          values={values}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </CustomizedDialogs>
      {appData?.selfAllowed && (
        <CustomizedDialogs
          title="Register"
          open={Boolean(modal.register)}
          handleClose={handleClose}
        >
          {<RegisterForm />}
        </CustomizedDialogs>
      )}
    </UserContainer>
  );
}
