import { LoginForm } from './LoginForm';
import {
  Box,
  // Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomizedDialogs from "../../common/Dailog";
import { LoginButton, UserContainer } from "../styledComponents";
// import { Info, InfoOutlined } from '@mui/icons-material';
import { FaInfo } from "react-icons/fa"
import { useFormik } from "formik";
import { authServices } from "../../../utils/api/auth/services";
import { UserContext } from "../../../App";

export function AuthBox() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { setIsSignedIn, setUser } = useContext(UserContext);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    onSubmit: async () => {
      const { response } = await authServices.login(values);
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response));
        if (setIsSignedIn) setIsSignedIn(true);
        if (setUser) setUser(response);
      }
    },
  });
  const matches = useMediaQuery("(max-width:1280px)");
  return (
    <UserContainer>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 5 }}>
        <Box
          display={{
            xs: "none",
            lg: "block",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Username*"
            required
            sx={{ borderRadius: 0 }}
            name="userId"
            value={values.userId}
            onChange={handleChange}
          />
          <Link
            to=""
            style={{
              display: "block",
              fontSize: "0.8rem",
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
            variant="outlined"
            size="small"
            placeholder="Password*"
            sx={{ borderRadius: 0 }}
            required
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  my: -1,
                }}
                defaultChecked
              />
            }
            label={
              <Typography component="span" fontSize={"0.7rem"} my={0}>
                I agree terms & conditions.
                <Tooltip title="I am at least 18 years of age and I have read, accept and agree to the Terms and Conditions , Responsible Gaming , GamCare, Gambling Therapy">
                  <Box component="span">
                    <FaInfo />
                  </Box>
                </Tooltip>
              </Typography>
            }
            sx={{
              display: "block",
              fontSize: "0.6rem",
              ml: "auto",
              my: 0,
            }}
          />
        </Box>
        <LoginButton
          variant="contained"
          sx={{
            height: "2.5rem",
          }}
          type="submit"
          onClick={() => {
            if (matches) {
              setOpen(true);
            }
          }}
        >
          Login
        </LoginButton>
      </form>
      <CustomizedDialogs title="Login" open={open} setOpen={setOpen}>
        <LoginForm
          values={values}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </CustomizedDialogs>
    </UserContainer>
  );
}
