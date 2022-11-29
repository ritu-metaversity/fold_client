import React, { useState } from "react";

import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Collapse, ListSubheader } from "@mui/material";
import { Icon, SidebarHeader } from "./styledComponents";
import { drawerWidth, topNavHeight } from "./header";
import BoxWithTitle from "../common/BoxWithTitle";
import { BoxWithTitleBox } from "../common/styledComponents";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { colorHex } from "../../constants";

interface Props extends React.PropsWithChildren {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}


const list = [
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
  "All mail",
  "Trash",
  "Spam",
].map((text, index) => (
  <ListItem key={text + index} disablePadding>
    <ListItemButton sx={{ color: "text.secondary" }}>
      <ListItemIcon>
        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
));
const Drawers = () => {
  const [open, setOpen] = useState([false, false, false, false, false]);
  const handleClick = (index: number) => {
    const openList = [...open];
    openList[index] = !open[index];
    setOpen(openList);
  };
  return (
    <Box p={1} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Icon src="/assets/images/icon.png" alt="ico" />
      {/* <BoxWithTitle title="Upcoming Fixure">
      <Box >
      
      ksdflajsdlfkjasldfkjlaskdj
      </Box>
    </BoxWithTitle>*/}
      <Box
        
        sx={{
          bgcolor: colorHex.bg7,
          overflow: "auto",
          height: "100%",
          position: "relative",
          maxHeight: "100vh",
        }}
      >
        <List sx={{p:0, m:0}}>
          <SidebarHeader>
            <ListItemButton onClick={() => handleClick(0)}>
              <ListItemText primary={"Exchange"} />
              {open[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[0]}>{list}</Collapse>
          <SidebarHeader>
            <ListItemButton onClick={() => handleClick(1)}>
              <ListItemText primary={"Live Casino"} />

              {open[1] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[1]}>{list}</Collapse>
          <SidebarHeader>
            <ListItemButton onClick={() => handleClick(2)}>
              <ListItemText primary={"Indian Games"} />

              {open[2] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[2]}>{list}</Collapse>
          <SidebarHeader>
            <ListItemButton onClick={() => handleClick(3)}>
              <ListItemText primary={"Virtual Casino"} />

              {open[3] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[3]}>{list}</Collapse>
          <SidebarHeader>
            <ListItemButton onClick={() => handleClick(4)}>
              <ListItemText primary={"Others"} />

              {open[4] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[4]}>{list}</Collapse>
        </List>
      </Box>
    </Box>
  );
};

const Sidebar = (props: Props) => {
  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        mt: { lg: topNavHeight },
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
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {/* {drawer} */}
        <Drawers />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            mt: { lg: topNavHeight },
            overflow: "hidden",
          },
        }}
        open
      >
        <Drawers />
        {/* {drawer} */}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
