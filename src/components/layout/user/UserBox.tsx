import { AvatarMenu } from './AvatarMenu';
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Avatar, Collapse, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { UserContainer } from "../styledComponents";

const UserBox = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(UserContext);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <UserContainer color="text.secondary" alignItems={"center"}>
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

        {user?.username}
        <KeyboardArrowDownOutlined />
      </Box>
      
    </UserContainer>
   <AvatarMenu   anchorEl={anchorEl} open={open} handleClose={handleClose}  />
    </>
  );
};

export default UserBox;
