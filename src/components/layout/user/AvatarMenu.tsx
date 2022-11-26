import { Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../App";
import CustomizedDialogPassword from "./ResetPasswordDailog";
import CustomizedDialogStack from "./StackDailog";
export function AvatarMenu({ anchorEl, open, handleClose }: any) {
  const { setIsSignedIn, setUser } = useContext(UserContext);
  const logout = () => {
    localStorage.clear();
    if (setUser) {
      setUser(null);
    }
    if (setIsSignedIn) {
      setIsSignedIn(false);
    }
  };
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          width: "100%",
        }}
        MenuListProps={{
          sx: {
            bgcolor: "#17191C",
          },
          "aria-labelledby": "basic-button",
        }} // transitionDuration={500}
        // TransitionComponent={Collapse}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>

        <CustomizedDialogPassword />
        <CustomizedDialogStack />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
