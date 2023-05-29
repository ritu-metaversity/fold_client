import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Menu,
  MenuItem as MuiMenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { authServices } from "../../../utils/api/auth/services";
import CustomizedDialogStack from "./StackDailog";

export const MenuItem = styled(MuiMenuItem)`
  font-size: 14px;
  min-height: 42px !important;
`;

export function AvatarMenu({ anchorEl, open, handleClose }: any) {
  const { setIsSignedIn, setModal, isSignedIn, appData, setUser } =
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
  const handleClickOpen = () => {
    if (setModal) {
      setModal({ changePassword: true });
      handleClose();
    }
  };


  const [openStake, setOpenStake] = React.useState(false);
  const handleStakeOpen = () => {
    handleClose();
    setOpenStake(true);
  };

  const handleStakeClose = () => {
    setOpenStake(false);
  };

  const matches = useMediaQuery("(max-width : 1280px)");
  return (
    <>
      <CustomizedDialogStack open={openStake} handleClose={handleStakeClose} />
      <Menu
        id="basic-menu"
        elevation={0}
        anchorEl={anchorEl}
        open={open}
        disableScrollLock
        onClose={handleClose}
        MenuListProps={{
          sx: {
            fontSize: "0.8rem",
            width: 170,
            bgcolor: "#17191C",
          },
          // "aria-labelledby": "basic-button",
        }} // transitionDuration={500}
        // TransitionComponent={Collapse}
      >
        {isSignedIn &&
          matches &&
          appData?.selfAllowed &&
          !localStorage.getItem("is_demo") && [
            <MenuItem
              key="avatarmenuitem1"
              disableRipple
              sx={{ justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  mr: 1,
                  px: 0.5,
                  minWidth: "unset",
                  color: "white",
                  py: 0.2,
                }}
                onClick={() => closeAndNav("/deposit")}
              >
                Deposit
              </Button>
              <Button
                variant="contained"
                onClick={() => closeAndNav("/withdraw-request")}
                color="error"
                sx={{ py: 0.2, px: 0.5, minWidth: "unset" }}
              >
                Withdrawal
              </Button>
            </MenuItem>,
            <Divider key="avatarmenuitem2" sx={{ borderColor: "gray" }} />,
          ]}
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
        <MenuItem onClick={handleStakeOpen}>Set Button Value</MenuItem>

        <MenuItem onClick={handleClickOpen}>Change Password</MenuItem>
        <Divider sx={{ borderColor: "gray" }} />
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </>
  );
}
