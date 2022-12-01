import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { MenuItem , TextField} from "@mui/material";
import { colorHex } from "../../../constants";
import { userServices } from "../../../utils/api/user/services";
// import { Box } from "@mui/system";
import { BootstrapDialog, BootstrapDialogTitle } from "./StackDailog";
import { useFormik } from "formik";

export default function CustomizedDialogPassword() {
  const [open, setOpen] = React.useState(false);
  // const [tab, setTab] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    onSubmit: async () => {
      await userServices.changePassword(values);
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
          <Typography color="primary.main">Set Button Value</Typography>
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
              //   onClick={handleClick}
            >
              Change Password
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
}
