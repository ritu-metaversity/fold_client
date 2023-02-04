import React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { colorHex } from "../../../utils/constants";
import { userServices } from "../../../utils/api/user/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../App";
import snackBarUtil from "../snackBarUtil";
import { authServices } from "../../../utils/api/auth/services";
import { useFormik } from "formik";

const ResetPasswordForm = ({ handleClose }: { handleClose: () => void }) => {
  const [searchParams] = useSearchParams();
  const firstLogin = searchParams.get("first-login");
  const { user, setUser, setIsSignedIn, setModal } =
    React.useContext(UserContext);
  const nav = useNavigate();

  const logout = async () => {
    const { response } = await authServices.logout();
    if (response) {
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
    }
  };

  const { values, resetForm, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        snackBarUtil.error("Password does not match.");
        return;
      }
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
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent
        sx={{ bgcolor: colorHex.bg1, color: "text.secondary" }}
        dividers
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          required
          margin="dense"
          label="Old Password"
          name={"currentPassword"}
          value={values.currentPassword}
          onChange={handleChange}
          //  onChange={ChangeHandlerFunction}
          type={"password"}
          sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem", p: 0 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          required
          margin="dense"
          label="New Password"
          name={"newPassword"}
          value={values.newPassword}
          onChange={handleChange}
          type={"password"}
          sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem", p: 0 }}
        />{" "}
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          required
          label="Confirm Password"
          name={"confirmPassword"}
          value={values.confirmPassword}
          onChange={handleChange}
          type={"password"}
          sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem", p: 0 }}
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
