import React, { useContext, useMemo } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Icon, IconSmall, SidebarHeader } from "./styledComponents";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import SidebarSport from "./SidebarSport";

export const Drawers = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: any;
}) => {
  //   const [open, setOpen] = useState([true, false, false, false, false]);
  //   const [matchCollapse, setMatchCollapse] = useState<boolean[]>([]);
  const { isSignedIn, setModal, appData, allocatedCasino } =
    useContext(UserContext);

  // const handleClick = (index: number) => {
  //   const openList = [...open];
  //   openList[index] = !open[index];
  //   setOpen(openList);
  // };

  // const handleClickSport = (index: number) => {
  //   const openList = [...matchCollapse];
  //   openList[index] = !matchCollapse[index];
  //   setMatchCollapse(openList);
  // };

  // useEffect(() => {
  //   if (activeEventList)
  //     setMatchCollapse([
  //       ...activeEventList.map((i: any) => (i ? false : false)),
  //       false,
  //     ]);
  // }, [activeEventList]);

  const nav = useNavigate();
  const showSideCasino = useMemo(
    () =>
      !isSignedIn ||
      allocatedCasino.Aura?.active ||
      allocatedCasino.QTech?.active ||
      allocatedCasino["Super Nova"]?.active,
    [allocatedCasino, isSignedIn]
  );
  return (
    <Box // p={{ lg: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
        bgcolor: {
          xs: colorHex.bg3,
          lg: isSignedIn ? colorHex.bg3 : colorHex.bg6,
        },
      }}
    >
      {
        <Icon
          onClick={() => nav("/")}
          src={appData?.mobileLogo} // src="/assets/images/icon.png"
          alt="ico"
        />
      }
      {isSignedIn && (
        <Box display={"flex"} alignItems="center" px={1}>
          <IconSmall
            style={{
              marginLeft: 1,
            }}
            src={appData?.mobileLogo}
            alt="logo"
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              pt: 1,
              ml: "auto",
              display: {
                lg: "none",
              },
            }}
          >
            <Menu fontSize="large" />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          bgcolor: {
            lg: colorHex.bg7,
          },
          overflow: "auto",
          height: "100%",
          position: "relative",
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        <List
          sx={{
            p: 0,
            m: 0,
          }}
        >
          <SidebarHeader
            sx={{
              borderBottom: "1px solid " + colorHex.borderLine,
            }}
          >
            <ListItemButton
              onClick={() => {
                nav("/");
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                }}
                primary={"DASHBOARD"}
              />
            </ListItemButton>
          </SidebarHeader>
          {showSideCasino && (
            <SidebarHeader
              sx={{
                borderBottom: "1px solid " + colorHex.borderLine,
              }}
            >
              <ListItemButton
                onClick={(e) => {
                  if (!isSignedIn) {
                    e.preventDefault();
                    setModal && setModal({ login: true });
                  } else {
                    nav("/livecasino");
                  }
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                  }}
                  primary={"LIVE CASINO"}
                />
              </ListItemButton>
            </SidebarHeader>
          )}
          <SidebarSport />
        </List>
      </Box>
    </Box>
  );
};
