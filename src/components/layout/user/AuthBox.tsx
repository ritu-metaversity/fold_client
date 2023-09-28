import LoginForm from "./LoginForm";
import {
  Box,
  CircularProgress,
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
import * as yup from "yup";
import { error } from "console";

export function AuthBox() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const { setIsSignedIn, appData, isSignedIn, setUser, modal, setModal } =
    useContext(UserContext);
  const nav = useNavigate();

  const { values, handleChange, errors, handleSubmit, resetForm } = useFormik({
    initialValues: {
      userId: "",
      password: "",
      checked: true,
      appUrl: window.location.hostname.replace("www.", ""),
    },
    onSubmit: async () => {
      if (!values.checked) {
        snackBarUtil.error("Please agree Terms and Conditions");
        return;
      }
      values.userId = values.userId.trim();
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
          snackBarUtil.success("Login Successful !!");
          if (setIsSignedIn) setIsSignedIn(true);
        }
        localStorage.setItem("userType", response.userTypeInfo);
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
      height: "2.2rem",
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
  const matches = useMediaQuery("(max-width:1279px)");
  const handleClose = () => {
    setModal && setModal({ login: false, register: false });
  };
  const handleDemoUserLogin = async () => {
    setDemoLoading(true);
    const { response } = await authServices.demoUserLogin(
      window.location.hostname.replace("www.", "")
    );
    if (response) {
      localStorage.setItem("is_demo", "true");
      localStorage.setItem("token", response.token);
      if (setUser) setUser(response);
      localStorage.setItem("userType", response.userTypeInfo);
      localStorage.setItem("user", JSON.stringify(response));
      if (response.passwordtype === "old" && setModal) {
        setModal({ changePassword: true });
        setLoading(false);
        nav({
          pathname: "/",
          search: "first-login=true",
        });
      } else {
        if (setIsSignedIn) setIsSignedIn(true);
      }
    }
    setDemoLoading(false);
  };
  return (
    <Box ml="auto">
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
                color="secondary"
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
                value={values.userId.trimStart()}
                onChange={handleChange}
                error={!!errors.userId}
                helperText={errors.userId}
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
                error={!!errors.password}
                helperText={errors.password}
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
              color="secondary"
              startIcon={
                loading ? (
                  <CircularProgress size={"0.8em"} color="error" />
                ) : undefined
              }
              variant="contained"
              sx={{
                cursor:
                  !matches && (values.userId === "" || values.password === "")
                    ? "not-allowed !important"
                    : "",
              }}
              type={matches ? "reset" : "submit"}
              onClick={() => {
                if (matches) {
                  setModal && setModal({ login: true });
                }
              }}
            >
              LOGIN
            </LoginButton>
            <LoginButton
              color="secondary"
              startIcon={
                demoLoading ? (
                  <CircularProgress size={"0.8em"} color="error" />
                ) : undefined
              }
              sx={{ display: { xs: "none", lg: "block" } }}
              disabled={demoLoading}
              variant="contained"
              onClick={handleDemoUserLogin}
            >
              Demo
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
            errors={errors}
            values={values}
            reset={resetForm}
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
      <Typography
        fontSize={"0.8rem"}
        fontWeight={"700"}
        sx={{ textDecoration: "underline" }}
        display={{ lg: "none" }}
        onClick={handleDemoUserLogin}
        color=" rgb(112, 49, 86)"
      >
        Login With Demo ID
      </Typography>
    </Box>
  );
}
