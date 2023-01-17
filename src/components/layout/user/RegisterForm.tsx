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
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../../App";
import { colorHex } from "../../../constants";
import { userServices } from "../../../utils/api/user/services";

import phoneCodes from "../../../utils/phoneCodes.json";
import snackBarUtil from "../snackBarUtil";

export function RegisterForm() {
  const { setModal } = useContext(UserContext);
  const matches = useMediaQuery("(max-width: 580px)");
  const matchesForModal = useMediaQuery("max-width: 1279px");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      checked: "",
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
      const { response } = await userServices.register(values);
      console.log(response);
      if (response) {
        if (setModal) {
          if (matchesForModal) {
            setModal({ login: true });
          } else {
            setModal({ register: false });
          }
        }
      }
    },
  });
  return (
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
              sx={{
                bgcolor: colorHex.bg4,
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
                sx={{ width: 100, bgcolor: colorHex.bg4 }}
                size={matches ? "small" : "medium"}
                disabled
                SelectProps={{
                  renderValue: (value) => (
                    <>+{phoneCodes.find((code) => code.code === value)?.code}</>
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
                margin="dense"
                sx={{
                  bgcolor: colorHex.bg4,
                  flex: 1,
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
              sx={{
                bgcolor: colorHex.bg4,
              }}
              required
              name="password"
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
              sx={{ bgcolor: colorHex.bg4 }}
              required
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Form.Check
              name="checked"
              value={values.checked}
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
          <Typography fontSize={"0.5rem"}>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </Typography>
        </Grid>
      </form>
    </Box>
  );
}
