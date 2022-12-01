import { AuthBox } from "./user/AuthBox";
import { Announcement } from "./Announcement";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { CenterBox, IconSmall, TopNavLinks } from "./styledComponents";
import {  Divider, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import { UserContext } from "../../App";
import UserBox from "./user/UserBox";
import { colorHex } from "../../constants";

export const drawerWidth = 220;

interface Props extends React.PropsWithChildren {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export const topNavHeight = "2.5rem";
export default function Header(props: Props) {
  const theme = useTheme();
  const value = React.useContext(UserContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const matches = useMediaQuery("(min-width:1200px)");
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CenterBox
        width={"100vw"}
        id="top-nav"
        sx={{
          height: topNavHeight,
          position: "fixed",
          bgcolor: "#3c444b",
          top: 0,
          gap: 3,
          zIndex: 100,
        }}
      >
        <TopNavLinks to="#" id={"top-nav-current"}>
          Exchange
        </TopNavLinks>
        <TopNavLinks to="#">Live Casino</TopNavLinks>
        <TopNavLinks to="#">Virtual Casino</TopNavLinks>
        {/* {value.isSignedIn && (
          <Box height="100%" sx={{ position: "absolute", right: 5, top: 5 }}>
            <Button variant="contained" color="success" sx={{ mr: 2, py: 0.3 }}>
              {" "}
              Deposit
            </Button>
            <Button variant="contained" color="error" sx={{ mr: 2, py: 0.3 }}>
              {" "}
              Withdraw
            </Button>
          </Box>
        )} */}
      </CenterBox>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          px: 0,
          mt: { lg: topNavHeight },
          [theme.breakpoints.down("lg")]: {
            bgcolor: colorHex.bg3,
          },
        }}
      >
        <Toolbar
          className="toolbar-padding"
          sx={{
            gap: 1,
            alignItems: "flex-start",
            pt: 2,
            [theme.breakpoints.down("lg")]: {
              bgcolor: colorHex.bg3,
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconSmall src="/assets/images/icon.png" />
          {matches && <Announcement />}
          {value?.isSignedIn ? <UserBox /> : <AuthBox />}
        </Toolbar>
        <Divider sx={{ p: 0, borderBottomWidth: 2 }} />
      </AppBar>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}
