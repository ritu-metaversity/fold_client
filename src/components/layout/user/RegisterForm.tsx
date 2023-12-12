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
import * as yup from "yup";
import { passwordRegex } from "../../../utils/regex";

// interface RegisterInterface {
//   username?: string;
//   password?: string;
// }
export function RegisterForm() {
  // const [newCredAfterRegister, setNewCredAfterRegister] =
  //   useState<RegisterInterface | null>(null);
  const matches = useMediaQuery("(max-width: 580px)");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setModal, setIsSignedIn, setUser, appData } = useContext(UserContext);
  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      casinoComm: appData?.casinoComm || 0,
      fancyComm: appData?.fancyComm || 0,
      oddsComm: appData?.oddsComm || 0,
      checked: true,
      appUrl: window.location.hostname.replace("www.", "") || "atozscore.com",
    },
    validateOnChange: true,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(4, "Minimum 4 letters required.")
        .max(8, "Maximum 8 letters required.")
        .matches(/^[a-zA-Z0-9]*$/, "Only number and alphabet are allowed.")
        .required("This field is required."),
      password: yup
        .string()
        .min(8, "Minimum 8 letters required.")
        .max(12, "Maximum 12 letters required.")
        .matches(
          passwordRegex,
          "Password should contain atleast one number and one lower case , one upper case."
        )
        .required("This field is required."),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), ""],
          "Confirm password should be same as password."
        )
        .required("This field is required."),
      mobile: yup
        .string()
        .matches(/^[0-9]*$/, "Invalid Phone Number")
        .length(10, "Must be 10 digit")
        .required("Mobile number is required."),
    }),
    onSubmit: async () => {
      if (values.confirmPassword !== values.password) {
        snackBarUtil.error("Password should be same.");
        return;
      }
      if (!values.checked) {
        snackBarUtil.error("Please agree Terms and Conditions");
        return;
      }
      values.username = values.username.trim();
      if (loading) return;
      setLoading(true);
      const { response } = await userServices.register(values);
      if (response) {
        // setNewCredAfterRegister(response);
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
      }
      setLoading(false);
    },
  });

  const handleDemoUserLogin = async () => {
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
  };
  // if (newCredAfterRegister) {
  //   return (
  //     <>
  //       <Grid
  //         container
  //         bgcolor={colorHex.bg3}
  //         my={2}
  //         py={2}
  //         px={2}
  //         borderRadius={1}
  //         rowGap={6}
  //       >
  //         <Grid item xs={6}>
  //           Username:
  //         </Grid>
  //         <Grid item xs={6}>
  //           {newCredAfterRegister?.username}
  //         </Grid>
  //         <Grid item xs={6}>
  //           Password:
  //         </Grid>
  //         <Grid item xs={6}>
  //           {newCredAfterRegister?.password}
  //         </Grid>
  //       </Grid>
  //       <Typography color="error.main">
  //         Please save these details and login with this username and password.
  //       </Typography>
  //     </>
  //   );
  // }
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
                error={!!errors.username}
                helperText={errors.username}
                name="username"
                value={values.username.trimStart()}
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
                  // type="number"
                  size={matches ? "small" : "medium"}
                  name="mobile"
                  onChange={handleChange}
                  value={values.mobile}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
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
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
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
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            {values.oddsComm > 0 && (
              <Grid
                item
                // xs={12}
                xs={5.76}
                sm={3.68}
              >
                Odds Comm.
                <TextField
                  size={matches ? "small" : "medium"}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                    sx: { bgcolor: colorHex.bg4 },
                  }}
                  value={values.oddsComm}
                />
              </Grid>
            )}
            {values.fancyComm > 0 && (
              <Grid
                item
                // xs={12}
                xs={5.76}
                sm={3.68}
              >
                Fancy Comm.
                <TextField
                  size={matches ? "small" : "medium"}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                    sx: { bgcolor: colorHex.bg4 },
                  }}
                  value={values.fancyComm}
                />
              </Grid>
            )}
            {values.casinoComm > 0 && (
              <Grid
                item
                // xs={12}
                xs={5.76}
                sm={3.68}
              >
                Casino Comm.
                <TextField
                  size={matches ? "small" : "medium"}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                    sx: { bgcolor: colorHex.bg4 },
                  }}
                  value={values.casinoComm}
                />
              </Grid>
            )}
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
