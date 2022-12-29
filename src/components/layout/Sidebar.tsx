import React, { useContext, useEffect, useMemo, useState } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Icon, SidebarHeader } from "./styledComponents";
import { drawerWidth, drawerWidthXl, topNavHeight } from "./header";
import { ExpandLess, ExpandMore, Menu, Search } from "@mui/icons-material";
import { colorHex } from "../../constants";
import { sportServices } from "../../utils/api/sport/services";
import { sportsTabList } from "../home/sportsTabList";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

interface Props extends React.PropsWithChildren {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}

export interface SportInterface {
  sportId: number;
  sportName: string;
  totalMatch: number;
  matchList: {
    matchId: number;
    matchName: string;
  }[];
}

const Drawers = ({ handleDrawerToggle }: { handleDrawerToggle: any }) => {
  const [open, setOpen] = useState([true, false, false, false, false]);
  const [matchCollapse, setMatchCollapse] = useState<boolean[]>([]);
  const { isSignedIn, activeEventList } = useContext(UserContext);

  const handleClick = (index: number) => {
    const openList = [...open];
    openList[index] = !open[index];
    setOpen(openList);
  };
  const handleClickSport = (index: number) => {
    const openList = [...matchCollapse];
    openList[index] = !matchCollapse[index];
    setMatchCollapse(openList);
  };

  useEffect(() => {
    if (activeEventList)
      setMatchCollapse(activeEventList.map((i: any) => (i ? false : false)));
  }, [activeEventList]);
  const exchangeList = useMemo(
    () =>
      activeEventList?.map((sport, index) => (
        <>
          {" "}
          <ListItem
            sx={{
              p: 0,
              gap: 0,
              bgcolor: matchCollapse[index]
                ? sportsTabList.find((sItem) => sItem.name === sport.sportName)
                    ?.color
                : "",
            }}
            key={sport.sportId + sport.totalMatch}
            disablePadding
          >
            <ListItemButton
              onClick={() => handleClickSport(index)}
              sx={{ color: matchCollapse[index] ? "white" : "text.secondary" }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                {
                  sportsTabList.find((sItem) => sItem.name === sport.sportName)
                    ?.icon
                }
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                  },
                }}
                primary={`${sport.sportName} ( ${sport.totalMatch} )`}
              />
              {matchCollapse[index] ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={matchCollapse[index]}>
            {sport.matchList.map((match) => (
              <ListItem
                key={sport.sportId + "-" + match.matchId}
                disablePadding
              >
                <ListItemButton
                  onClick={() =>
                    isSignedIn &&
                    nav(`/sports/details/?match-id=${match.matchId}`)
                  }
                  sx={{ color: "text.secondary" }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.8rem",
                      },
                    }}
                    primary={`${match.matchName}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeEventList, matchCollapse, isSignedIn]
  );

  const nav = useNavigate();

  return (
    <Box
      // p={{ lg: 1 }}
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
          src="/assets/images/icon.png"
          alt="ico"
        />
      }
      {isSignedIn && (
        <Box display={"flex"} alignItems="center" px={1}>
          {/* <SearchTextField /> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ pt: 1, ml: "auto", display: { lg: "none" } }}
          >
            <Menu fontSize="large" />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          bgcolor: { lg: colorHex.bg7 },
          overflow: "auto",
          height: "100%",
          position: "relative",
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        <List sx={{ p: 0, m: 0 }}>
          <SidebarHeader
            sx={{ borderBottom: "1px solid " + colorHex.borderLine }}
          >
            <ListItemButton onClick={() => handleClick(0)}>
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.9rem" }}
                primary={"Exchange"}
              />
              {open[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[0]}>{exchangeList}</Collapse>
        </List>
      </Box>
    </Box>
  );
};

const Sidebar = (props: Props) => {
  const { window } = props;
  const { isSignedIn } = useContext(UserContext);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth, xl: drawerWidthXl },
        mt: { lg: topNavHeight },
        // ml:0.5,
        flexShrink: { lg: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          zIndex: !isSignedIn ? 100 : undefined,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "70%",
            bgcolor: colorHex.bg7,
            backgroundImage: "none",
            height: "100vh",
          },
        }}
      >
        {/* {drawer} */}
        <Drawers handleDrawerToggle={props.handleDrawerToggle} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { lg: drawerWidth, xl: drawerWidthXl },
            mt: { lg: topNavHeight },
            overflow: "hidden",
            pr: 1,
          },
        }}
        open
      >
        <Drawers handleDrawerToggle={props.handleDrawerToggle} />
        {/* {drawer} */}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

export function SearchTextField(props:TextFieldProps) {
  return (
    <TextField
      size={"small"}
      placeholder="Search"
      sx={{
        fontSize: "0.8rem",
        "& fieldset": {
          border: "none",
        },
        flex: 1,
        m: {
          sx: 1,
          lg: 0,
        },
      }}
      fullWidth
      InputProps={{
        style: {
          fontSize: "0.8rem",
          background: colorHex.bg6,
        },
        endAdornment: (
          <InputAdornment position="end">
            <Search htmlColor={"#aaafb5"} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
