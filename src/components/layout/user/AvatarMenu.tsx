import { Button, Divider, Menu, MenuItem, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { authServices } from "../../../utils/api/auth/services";
import CustomizedDialogPassword from "./ResetPasswordDailog";
import CustomizedDialogStack from "./StackDailog";

export function AvatarMenu({ anchorEl, open, handleClose }: any) {
  const { setIsSignedIn, isSignedIn, appData, setUser } =
    useContext(UserContext);

  const nav = useNavigate();

  const closeAndNav = (href: string) => {
    handleClose();
    nav(href);
  };
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
    }
  };

  const matches = useMediaQuery("(max-width : 1280px)");
  return (
    <>
      <Menu
        id="basic-menu"
        elevation={0}
        anchorEl={anchorEl}
        open={open}
        disableScrollLock
        keepMounted
        onClose={handleClose}
        sx={{
          width: "100%",
        }}
        MenuListProps={{
          sx: {
            bgcolor: "#17191C",
          },
          // "aria-labelledby": "basic-button",
        }} // transitionDuration={500}
        // TransitionComponent={Collapse}
      >
        {isSignedIn && matches && appData?.selfAllowed && (
          <>
            <MenuItem disableRipple>
              <Button
                variant="contained"
                color="success"
                sx={{ mr: 1, color: "white", py: 0.2 }}
                onClick={() => closeAndNav("/deposit")}
              >
                Deposit
              </Button>
              <Button
                variant="contained"
                onClick={() => closeAndNav("/withdraw-request")}
                color="error"
                sx={{ py: 0.2 }}
              >
                Withdraw
              </Button>
            </MenuItem>
            <Divider />
          </>
        )}
        <MenuItem onClick={() => closeAndNav("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => closeAndNav("/report/accountstatement")}>
          Account Statement
        </MenuItem>
        <MenuItem onClick={() => closeAndNav("/report/currentbets")}>
          Current Bets
        </MenuItem>
        <MenuItem onClick={() => closeAndNav("/report/activity")}>
          Activity Log
        </MenuItem>

        <CustomizedDialogPassword />
        <CustomizedDialogStack />
        <Divider />
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </>
  );
}
