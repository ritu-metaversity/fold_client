import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { colorHex } from "../../../utils/constants";
import { userServices } from "../../../utils/api/user/services";
// import { Box } from "@mui/system";
import { useFormik } from "formik";
import { BootstrapDialog, BootstrapDialogTitle } from "../../common/Dailog2";
import { DialogTitleStyledTypo } from "./styledComponents";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../App";
import snackBarUtil from "../snackBarUtil";
import { MenuItem } from "./AvatarMenu";

export default function CustomizedDialogPassword() {
  const [open, setOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const firstLogin = searchParams.get("first-login");
  const { modal, user, setModal } = React.useContext(UserContext);
  const nav = useNavigate();

  React.useEffect(() => {
    if (modal.changePassword) {
      setOpen(true);
    }
  }, [modal]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { values, resetForm, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    onSubmit: async () => {
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
          if (setModal) {
            setModal({ login: true });
          }
          snackBarUtil.success("Please login again !! ");
          resetForm();
          nav({ pathname: "", search: "" });
        }
      } else {
        await userServices.changePassword(values);
      }
    },
  });

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Change Password</MenuItem>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <DialogTitleStyledTypo>Change Password</DialogTitleStyledTypo>
        </BootstrapDialogTitle>
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
      </BootstrapDialog>
    </>
  );
}
  