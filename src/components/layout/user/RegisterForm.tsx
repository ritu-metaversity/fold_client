import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { colorHex } from "../../../utils/constants";
import { userServices } from "../../../utils/api/user/services";

import phoneCodes from "../../../utils/phoneCodes.json";
import Loading from "../loading";
import snackBarUtil from "../snackBarUtil";
import { authServices } from "../../../utils/api/auth/services";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

interface RegisterInterface {
  username?: string;
  password?: string;
}

export function RegisterForm() {
  const [newCredAfterRegister, setNewCredAfterRegister] =
    useState<RegisterInterface | null>(null);
  const matches = useMediaQuery("(max-width: 580px)");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setModal, setIsSignedIn, setUser, appData } = useContext(UserContext);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      checked: true,
      appUrl: window.location.hostname || "atozscore.com",
    },

    onSubmit: async () => {
      if (values.confirmPassword !== values.password) {
        snackBarUtil.error("Password should be same.");
        return;
      }
      if (!values.checked) {
        snackBarUtil.error("Please agree Terms and Conditions");
        return;
      }
      if (loading) return;
      setLoading(true);
      const { response } = await userServices.register(values);
      if (response) {
        setNewCredAfterRegister(response);
      }
      setLoading(false);
    },
  });

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
        setLoading(false);
        nav({
          pathname: "/",
          search: "first-login=true",
        });
      } else {
        if (setIsSignedIn) setIsSignedIn(true);
      }
    }
  };
  if (newCredAfterRegister) {
    return (
      <>
        <Grid
          container
          bgcolor={colorHex.bg3}
          my={2}
          py={2}
          px={2}
          borderRadius={1}
          rowGap={6}
        >
          <Grid item xs={6}>
            Username:
          </Grid>
          <Grid item xs={6}>
            {newCredAfterRegister?.username}
          </Grid>
          <Grid item xs={6}>
            Password:
          </Grid>
          <Grid item xs={6}>
            {newCredAfterRegister?.password}
          </Grid>
        </Grid>
        <Typography color="error.main">
          Please save these details and login with this username and password.
        </Typography>
      </>
    );
  }
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
        <form onSubmit={handleSubmit}>
          <Grid
            fontWeight={400}
            color="white"
            container
            rowGap={{ xs: "15px", md: "30px" }}
            sx={{
              columnGap: "4%",
            }}
          >
            <Grid item xs={12} sm={5.76}>
              Username
              <TextField
                placeholder="Enter Username"
                fullWidth
                size={matches ? "small" : "medium"}
                margin="dense"
                InputProps={{
                  sx: {
                    bgcolor: colorHex.bg4,
                  },
                }}
                required
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5.76}>
              Phone Number
              <Box display="flex">
                <TextField
                  select
                  margin="dense"
                  defaultValue={"91"}
                  sx={{
                    width: 100,
                  }}
                  InputProps={{
                    sx: {
                      bgcolor: colorHex.bg4,
                    },
                  }}
                  size={matches ? "small" : "medium"}
                  disabled
                  SelectProps={{
                    renderValue: (value) => (
                      <>
                        +{phoneCodes.find((code) => code.code === value)?.code}
                      </>
                    ),
                    MenuProps: { PaperProps: { sx: { maxHeight: 240 } } },
                  }}
                >
                  {phoneCodes.map((code) => (
                    <MenuItem
                      key={code.code + code.iso}
                      value={code.code}
                      sx={{ fontSize: "0.8rem" }}
                    >
                      {code.country}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="remove-rotation-class"
                  margin="dense"
                  sx={{ flex: 1 }}
                  InputProps={{
                    sx: { bgcolor: colorHex.bg4 },
                  }}
                  type="number"
                  size={matches ? "small" : "medium"}
                  name="mobile"
                  onChange={handleChange}
                  value={values.mobile}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5.76}>
              New Password
              <TextField
                placeholder="New Password"
                fullWidth
                size={matches ? "small" : "medium"}
                margin="dense"
                InputProps={{
                  sx: { bgcolor: colorHex.bg4 },
                }}
                required
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5.76}>
              Confirm Password
              <TextField
                placeholder="Confirm Password"
                size={matches ? "small" : "medium"}
                fullWidth
                margin="dense"
                type="password"
                InputProps={{
                  sx: { bgcolor: colorHex.bg4 },
                }}
                required
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.Check
                name="checked"
                checked={values.checked}
                onChange={handleChange}
                type="checkbox"
                label={
                  <Typography ml={0.5} color="white" variant="caption">
                    I am at least 18 years of age and I have read, accept and
                    agree to the Terms and Conditions , Responsible Gaming,
                    GamCare, Gambling Therapy
                  </Typography>
                }
              />
            </Grid>

            <Button
              sx={{ p: 2.5 }}
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
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
