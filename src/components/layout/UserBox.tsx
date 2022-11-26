import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Avatar, Collapse, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UserContainer } from "./styledComponents";

const UserBox = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const username = "sushant";

  return (
    <UserContainer color="text.secondary" alignItems={"center"} >
      <Typography my="auto">pt : 0 | 0</Typography>
      <Box
        display="flex"
        alignItems={"center"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        gap={2}
        onClick={handleClick}
      >
        <Avatar color="gray.100"></Avatar>

        {username}
        <KeyboardArrowDownOutlined />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: "100%" }}
        MenuListProps={{
          sx: { bgcolor: "#17191C" },
          "aria-labelledby": "basic-button",
        }}

        // transitionDuration={500}
        // TransitionComponent={Collapse}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Set button Value</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </UserContainer>
  );
};

export default UserBox;
