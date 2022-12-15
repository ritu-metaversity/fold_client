import { AuthBox } from "./user/AuthBox";
import { Announcement } from "./Announcement";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  CenterBox,
  Icon,
  IconSmall,
  StyledAppBar,
  TopNavLinks,
} from "./styledComponents";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import { UserContext } from "../../App";
import UserBox from "./user/UserBox";
import { colorHex } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
export const drawerWidth = 220;
export const drawerWidthXl = 270;

interface Props extends React.PropsWithChildren {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const linksWithoutSideBar = [
  "/report/accountstatement",
  "/report/activity",
  "/report/currentbets",
];

export const topNavHeight = "2.5rem";

export default function Header(props: Props) {
  const theme = useTheme();
  const value = React.useContext(UserContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const notShowSidebar = linksWithoutSideBar.includes(loc.pathname);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { isSignedIn } = React.useContext(UserContext);
  const matches = useMediaQuery("(min-width:1280px)");
  const drawerWidthLocal = notShowSidebar ? 0 : drawerWidth;
  const drawerWidthXlLocal = notShowSidebar ? 0 : drawerWidthXl;

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
        <TopNavLinks to="/" id={"top-nav-current"}>
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
      <StyledAppBar
        position="fixed"
        elevation={0}
        sx={{
          alignItems: notShowSidebar ? "center" : "",
          width: {
            lg: `calc(100% - ${drawerWidthLocal}px)`,
            xl: `calc(100% - ${drawerWidthXlLocal}px)`,
          },
          ml: { lg: `${drawerWidthLocal}px`, xl: `${drawerWidthXlLocal}px` },
          pr: 1,
          mt: { lg: topNavHeight },
          [theme.breakpoints.down("lg")]: {
            bgcolor: isSignedIn ? "" : colorHex.bg3,
            height: isSignedIn ? 64 : 50,
          },
        }}
      >
        {/* <Toolbar
          className="toolbar-padding"
          sx={{
            gap: 1,
            alignItems: !notShowSidebar ? "flex-start" : "center",
            pt: { lg: 2 },
            [theme.breakpoints.down("lg")]: {
              bgcolor: colorHex.bg3,
              height: !isSignedIn ? 50 : undefined,
              
            },
            maxHeight: 50,
          }}
        > */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          // edge="start"

          onClick={notShowSidebar ? () => nav("/") : handleDrawerToggle}
          sx={{
            "&:hover": { bgcolor: "transparent" },
            my: "auto",
            mr: 1,
            pt: 0,
            display: { lg: "none" },
          }}
        >
          {notShowSidebar ? (
            <HomeRoundedIcon sx={{ fontSize: "2rem", mt: 1.5 }} />
          ) : (
            <MenuIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
        {notShowSidebar && matches && (
          <Box width={220} p={1}>
            <Icon
              onClick={() => nav("/")}
              src="/assets/images/icon.png"
              alt="ico"
            />
          </Box>
        )}
        <IconSmall onClick={() => nav("/")} src="/assets/images/icon.png" />
        {matches && <Announcement />}
        {value?.isSignedIn ? <UserBox /> : <AuthBox />}
        {/* </Toolbar>  */}
        {/* <Divider sx={{ p: 0, borderBottomWidth: 2 }} /> */}
      </StyledAppBar>
      {!notShowSidebar && (
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
    </Box>
  );
}
