import { LoginForm } from './LoginForm';
import {
  Box,
  // Button,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../../common/Dailog";
import { LoginButton, UserContainer } from "../styledComponents";
// import { Info, InfoOutlined } from '@mui/icons-material';
import { FaInfo } from "react-icons/fa";
import { useFormik } from "formik";
import { authServices } from "../../../utils/api/auth/services";
import { UserContext } from "../../../App";
import { Form } from "react-bootstrap";
import snackBarUtil from "../snackBarUtil";
import { RegisterForm } from "./RegisterForm";

export function AuthBox() {
  const theme = useTheme();
  const { setIsSignedIn, setUser, modal, setModal } = useContext(UserContext);
  const nav = useNavigate();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: "",
      password: "",
      checked: "checked",
    },
    onSubmit: async () => {
      if (!values.checked) {
        snackBarUtil.error("Please agree Terms and Conditions");
        return;
      }
      const { response } = await authServices.login(values);
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response));
        if (setIsSignedIn) setIsSignedIn(true);
        if (setUser) setUser(response);
        if (response.passwordtype === "new" && setModal) {
          setModal({ changePassword: true });
          nav({
            pathname: "/",
            search: "first-login=true",
          });
        }
      }
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
        maxWidth: "10rem",
        padding: "0.2rem 0.8rem",
      },
    },
    onChange: handleChange,
  };
  const matches = useMediaQuery("(max-width:1280px)");
  const handleClose = () => {
    setModal && setModal({ login: false, register: false });
  };

  return (
    <UserContainer>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "0.2rem", lg: "0.5rem" },
            marginLeft: { sm: "1rem" },
          }}
        >
          <LoginButton
            variant="contained"
            onClick={() => {
              setModal && setModal({ register: true });
            }}
          >
            REGISTER
          </LoginButton>
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
            <Link
              to=""
              style={{
                display: "block",
                fontSize: "0.7rem",
                textAlign: "right",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Forgot Password ?
            </Link>
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
              variant="outlined"
              size="small"
              value={values.password}
              {...textFieldProps}
            />
            <Form.Check
              name="checked"
              value={values.checked}
              onChange={handleChange}
              type="checkbox"
              defaultChecked
              label={
                <Typography
                  component="span"
                  fontSize={"0.65rem"}
                  sx={{ verticalAlign: "top" }}
                  my={0}
                >
                  I agree terms & conditions.
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
            variant="contained"
            type="submit"
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
          values={values}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        title="Register"
        open={Boolean(modal.register)}
        handleClose={handleClose}
      >
        <RegisterForm />
      </CustomizedDialogs>
    </UserContainer>
  );
}
