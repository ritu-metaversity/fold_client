import { Drawers } from "./SideBarDrawer";
import React, { useContext, useMemo } from "react";

import Drawer from "@mui/material/Drawer";

import { Box, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { drawerWidth, drawerWidthXl, topNavHeight } from "./header";
import { Search } from "@mui/icons-material";
import { colorHex } from "../../utils/constants";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";
import SideBarCasino from "./SideBarCasino";

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
    date: string;
    matchName: string;
  }[];
}

const Sidebar = (props: Props) => {
  const { window } = props;
  const { pathname } = useLocation();
  const { isSignedIn } = useContext(UserContext);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const sideBar = useMemo(
    () => <SideBarCasino handleDrawerToggle={props.handleDrawerToggle} />,
    [props.handleDrawerToggle]
  );
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
        {pathname.split("/")[1] === "casino" ? (
          <>{sideBar}</>
        ) : (
          <Drawers handleDrawerToggle={props.handleDrawerToggle} />
        )}
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
        {pathname.split("/")[1] === "casino" ? (
          <>{sideBar}</>
        ) : (
          <Drawers handleDrawerToggle={props.handleDrawerToggle} />
        )} 
        {/* {drawer} */}
      </Drawer>
    </Box>
  );
};

export default React.memo(Sidebar);

export function SearchTextField(props: TextFieldProps) {
  return (
    <TextField
      size={"small"}
      placeholder="Search"
      sx={{
        fontSize: "0.8rem",
        "& fieldset": { border: "none" },
        flex: 1,
        m: { sx: 1, lg: 0 },
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
