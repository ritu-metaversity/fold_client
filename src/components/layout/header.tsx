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
import { Button, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import { UserContext } from "../../App";
import UserBox from "./user/UserBox";
import { colorHex } from "../../utils/constants";
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

export const topNavHeight = "1.9rem";

export default function Header(props: Props) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const notShowSidebar = linksWithoutSideBar.includes(loc.pathname);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { pathname } = useLocation();
  const { isSignedIn, appData } = React.useContext(UserContext);
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
        <TopNavLinks
          to="/"
          style={
            pathname !== "/casino" && pathname !== "/virtual-casino"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
        >
          Exchange
        </TopNavLinks>
        <TopNavLinks
          style={
            pathname === "/casino"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/casino"
        >
          Live Casino
        </TopNavLinks>
        <TopNavLinks
          style={
            pathname === "/virtual-casino"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/virtual-casino"
        >
          Virtual Casino
        </TopNavLinks>
        {isSignedIn && appData?.selfAllowed && (
          <Box
            height="100%"
            sx={{ position: "absolute", right: 5, my: 0.3, top: 0 }}
          >
            <Button
              variant="contained"
              onClick={() => nav("/deposit")}
              color="success"
              sx={{ mr: 2, py: 0.2 }}
            >
              Deposit
            </Button>
            <Button
              variant="contained"
              onClick={() => nav("withdraw-request")}
              color="error"
              sx={{ mr: 2, py: 0.2 }}
            >
              Withdraw
            </Button>
          </Box>
        )}
      </CenterBox>
      <StyledAppBar
        position="fixed"
        elevation={0}
        sx={{
          flexWrap: "wrap",
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
            height: isSignedIn ? "max-content" : 50,
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
              src={appData?.mobileLogo}
              // src="/assets/images/icon.png"
              alt="ico"
            />
          </Box>
        )}
        <IconSmall onClick={() => nav("/")} src={appData?.logo} />
        {matches && <Announcement />}
        {isSignedIn ? <UserBox /> : <AuthBox />}
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
