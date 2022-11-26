import React from "react";

import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/material";
import { Icon } from "./styledComponents";
import { drawerWidth, topNavHeight } from "./header";
import BoxWithTitle from "../common/BoxWithTitle";
import { BoxWithTitleBox } from "../common/styledComponents";

interface Props extends React.PropsWithChildren {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}
const drawer = (
  <Box p={1} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Icon src="/assets/images/icon.png" alt="ico" />
    <BoxWithTitle title="Upcoming Fixure">
      ksdflajsdlfkjasldfkjlaskdj
    </BoxWithTitle>
    <BoxWithTitleBox sx={{overflow:"scroll"}}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{overflow:"scroll",height:"100%"}}>
        {[
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
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </BoxWithTitleBox>
  </Box>
);

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
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            mt: { lg: topNavHeight },
            overflow: "hidden"
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
