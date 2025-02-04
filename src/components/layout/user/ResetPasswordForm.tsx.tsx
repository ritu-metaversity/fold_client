import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, TextField } from "@mui/material";
import { colorHex } from "../../../utils/constants";
import { userServices } from "../../../utils/api/user/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../App";
import snackBarUtil from "../snackBarUtil";
import { useFormik } from "formik";
import Loading from "../loading";
import * as yup from "yup";
import { passwordRegex } from "../../../utils/regex";

const ResetPasswordForm = ({ handleClose }: { handleClose: () => void }) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const firstLogin = searchParams.get("first-login");
  const { user, setUser, setIsSignedIn, setModal } =
    React.useContext(UserContext);
  const nav = useNavigate();

  const logout = async () => {
    // const { response } = await authServices.logout();
    // if (response) {
    localStorage.clear();
    nav("/");
    if (setUser) {
      setUser(null);
    }
    if (setIsSignedIn) {
      setIsSignedIn(false);
    }
    if (setModal) {
      setModal({ login: true });
    }
    snackBarUtil.success("Please login again !! ");
    resetForm();
    nav({ pathname: "", search: "" });
    // }
  };

  const { values, resetForm, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    validateOnChange: true,
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .min(8, "Minimum 8 letters required.")
        .max(12, "Maximum 12 letters required.")
        .matches(
          passwordRegex,
          "Password should contain atleast one number and one lower case , one upper case."
        )
        .required("Please enter new Password"),
      currentPassword: yup
        .string()
        // .min(8, "Minimum 8 letters required.")
        // .max(12, "Maximum 12 letters required.")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        //   "Password should contain atleast one number and one lower case , one upper case."
        // )
        .required("Please enter Current Password"),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("newPassword"), ""],
          "New password and confirm Password does not match"
        ),
    }),
    // validate: async (values) => {
    //   const newError = {
    //     newPassword:
    //       values?.newPassword === "" ? "Please enter new Password" : undefined,
    //     confirmPassword:
    //       values?.confirmPassword === ""
    //         ? "Please enter confirm Password"
    //         : values?.confirmPassword !== values?.newPassword
    //         ? "New password and confirm Password does not match"
    //         : undefined,
    //     currentPassword:
    //       values?.currentPassword === ""
    //         ? "Please enter Current Password"
    //         : undefined,
    //   };
    //   return Object.fromEntries(
    //     Object.entries(newError).filter(([_, v]) => v != null)
    //   );
    // },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        snackBarUtil.error("Password does not match.");
        return;
      }
      setLoading(true);
      if (firstLogin) {
        const newValues = {
          ...values,
          oldPassword: values.currentPassword,
          userid: user.userId,
          token: user.token,
        };
        const { response } = await userServices.changePasswordFirstLogin(
          newValues
        );
        if (response) {
          handleClose();
          localStorage.clear();
          snackBarUtil.success("Please login again !! ");
          if (setModal) {
            setModal({ login: true });
          }
        }
      } else {
        const { response } = await userServices.changePassword(values);
        if (response) {
          handleClose();
          await logout();
        }
      }
      setLoading(false);
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 20 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
        >
          <Loading />
        </Box>
      )}
      <DialogContent
        sx={{ bgcolor: colorHex.bg1, color: "text.secondary" }}
        dividers
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          //required
          margin="dense"
          error={!!errors?.currentPassword}
          helperText={errors?.currentPassword}
          label="Old Password"
          name={"currentPassword"}
          value={values.currentPassword}
          onChange={handleChange}
          //  onChange={ChangeHandlerFunction}
          type={"password"}
          InputProps={{ sx: { bgcolor: colorHex.bg6 } }}
          sx={{ fontSize: "0.8rem", p: 0 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          //required
          error={Boolean(errors?.newPassword)}
          helperText={errors?.newPassword}
          margin="dense"
          label="New Password"
          name={"newPassword"}
          value={values.newPassword}
          onChange={handleChange}
          InputProps={{ sx: { bgcolor: colorHex.bg6 } }}
          type={"password"}
          sx={{ fontSize: "0.8rem", p: 0 }}
        />{" "}
        <TextField
          fullWidth
          variant="outlined"
          error={Boolean(errors?.confirmPassword)}
          helperText={errors?.confirmPassword}
          size="small"
          margin="dense"
          //required
          label="Confirm Password"
          name={"confirmPassword"}
          value={values.confirmPassword}
          onChange={handleChange}
          InputProps={{ sx: { bgcolor: colorHex.bg6 } }}
          type={"password"}
          sx={{ fontSize: "0.8rem", p: 0 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ color: "white" }}
          // onClick={handleClick}
        >
          Change Password
        </Button>
      </DialogActions>
    </form>
  );
};

export default React.memo(ResetPasswordForm);
