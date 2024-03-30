import { AuthBox } from "./user/AuthBox";
import { Announcement } from "./Announcement";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ButtonSmallStyled,
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
import styled from "@emotion/styled";
import { LinksAndLabels, getLinksAndLabels } from "../home/buttonTabs";
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
  "/slot",
  "/livecasino",
  "/instantWin",
  "/fantasy",
  "/lottery",
];

export const topNavHeight = "1.9rem";

const Circle = styled.div`
  background-color: white;
  height: 8px;
  width: 8px;
  border-radius: 8px;
  top: 7px;
  right: -16px;
  margin-block: auto;
`;

export default function Header(props: Props) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const notShowSidebar = linksWithoutSideBar.includes(loc.pathname);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const host = window.location.hostname;
  const { pathname } = useLocation();
  const { isSignedIn, allocatedCasino, appData, user, setModal } =
    React.useContext(UserContext);
  const matches = useMediaQuery("(min-width:1280px)");
  const drawerWidthLocal = notShowSidebar ? 0 : drawerWidth;
  const drawerWidthXlLocal = notShowSidebar ? 0 : drawerWidthXl;
  const linkAndLabel = isSignedIn
    ? getLinksAndLabels(allocatedCasino)
    : LinksAndLabels;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CenterBox
        width={"100vw"}
        id="top-nav"
        sx={{
          height: { sx: 0, lg: topNavHeight },
          position: "fixed",
          bgcolor: "tertiary.main",
          top: 0,
          gap: 3,
          zIndex: 100,
        }}
      >
        {linkAndLabel.map((item, index) => {
          if(host.includes("onlycricket.co.in")){
            if(item?.label !== "Exchange") return null
          }
          return(
          <>
            <TopNavLinks
              onClick={(e) => {
                if (!isSignedIn && item?.require) {
                  e.preventDefault();
                  setModal && setModal({ login: true });
                }
              }}
              to={item.link}
              style={
                pathname === item.link
                  ? {
                      color: "#fdcf13",
                      borderBottom: "2px solid #fdcf13",
                    }
                  : {}
              }
            >
              {item.label}
            </TopNavLinks>
            {host.includes("onlycricket.co.in")?null: isSignedIn && index + 1 !== linkAndLabel.length && <Circle />}
          </>
        )})}

        {/* <TopNavLinks
          onClick={(e) => {
            if (!isSignedIn) {
              e.preventDefault();
              setModal && setModal({ login: true });
            }
          }}
          style={
            pathname === "/livecasino"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/livecasino"
        >
          Live Casino
        </TopNavLinks> */}
        {/* {isSignedIn && <Circle />}
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
        </TopNavLinks> */}
        {/* {isSignedIn && <Circle />}
        <TopNavLinks
          onClick={(e) => {
            if (!isSignedIn) {
              e.preventDefault();
              setModal && setModal({ login: true });
            }
          }}
          style={
            pathname === "/slot"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/slot"
        >
          Slot
        </TopNavLinks> */}
        {/* {isSignedIn && <Circle />}
        <TopNavLinks
          onClick={(e) => {
            if (!isSignedIn) {
              e.preventDefault();
              setModal && setModal({ login: true });
            }
          }}
          style={
            pathname === "/games"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/games"
        >
          Games
        </TopNavLinks>
        {isSignedIn && <Circle />} */}
        {/* <TopNavLinks
          onClick={(e) => {
            if (!isSignedIn) {
              e.preventDefault();
              setModal && setModal({ login: true });
            }
          }}
          style={
            pathname === "/fantasy"
              ? {
                  color: "#fdcf13",
                  borderBottom: "2px solid #fdcf13",
                }
              : {}
          }
          to="/fantasy"
        >
          Fantasy Games
        </TopNavLinks> */}
        {isSignedIn && appData?.selfAllowed && !(user?.userTypeInfo === 2) && (
          <Box
            height="100%"
            sx={{
              position: "absolute",
              right: 10,
              my: 0.3,
              top: 0,
              gap: "5px",
              display: "flex",
            }}
          >
            <ButtonSmallStyled
              variant="contained"
              onClick={() => nav("/deposit")}
              color="success"
              size="small"
            >
              Deposit
            </ButtonSmallStyled>
            <ButtonSmallStyled
              variant="contained"
              onClick={() => nav("withdraw-request")}
              color="error"
              size="small"
            >
              Withdraw
            </ButtonSmallStyled>
          </Box>
        )}
      </CenterBox>
      <StyledAppBar
        position="fixed"
        elevation={0}
        sx={{
          flexWrap: "wrap",
          alignItems: notShowSidebar || !matches ? "center" : "",
          width: {
            lg: `calc(100% - ${drawerWidthLocal}px)`,
            xl: `calc(100% - ${drawerWidthXlLocal}px)`,
          },
          ml: { lg: `${drawerWidthLocal}px`, xl: `${drawerWidthXlLocal}px` },
          pr: 1,
          mt: { lg: topNavHeight },
          [theme.breakpoints.down("lg")]: {
            bgcolor: isSignedIn ? "" : colorHex.bg3,
            height:
              // isSignedIn ?
              "max-content",
            //  : 50,
          },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
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
            <HomeRoundedIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <MenuIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
        {notShowSidebar && matches && (
          <Box width={220} p={1}>
            <Icon
              onClick={() => nav("/")}
              src={appData?.mobileLogo}
              alt="ico"
            />
          </Box>
        )}
        <IconSmall onClick={() => nav("/")} src={appData?.logo} />
        {matches && <Announcement />}
        {isSignedIn ? <UserBox /> : <AuthBox />}
        {!matches && (
          <Box
            width={"100%"}
            display={"flex"}
            gap={"2px"}
            alignItems={"center"}
          >
            {!matches && <Announcement />}
            {isSignedIn &&
              appData?.selfAllowed &&
              !(user?.userTypeInfo === 2) && (
                <>
                  <ButtonSmallStyled
                    variant="contained"
                    onClick={() => nav("/deposit")}
                    color="success"
                    size="small"
                  >
                    Deposit
                  </ButtonSmallStyled>
                  <ButtonSmallStyled
                    variant="contained"
                    onClick={() => nav("withdraw-request")}
                    color="error"
                    size="small"
                  >
                    Withdraw
                  </ButtonSmallStyled>
                </>
              )}
          </Box>
        )}
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
