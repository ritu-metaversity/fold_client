import { AvatarMenu } from './AvatarMenu';
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
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
    <UserContainer sx={{flexDirection: {xs:"column",lg:"row"}}} color="text.secondary" alignItems={"center"}>
      <Typography my="auto">pt : 0 | 0</Typography>
      <Box
        display="flex"
        alignItems={"center"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
          gap={{xs:1,lg:1.5}}
          fontSize={"0.8rem" }
        onClick={handleClick}
      >
        <Avatar color="gray.100" sx={{maxWidth:{xs:"1rem",lg:"3rem"},maxHeight:{xs:"1rem",lg:"3rem"}}} ></Avatar>

        {user?.username}
        <KeyboardArrowDownOutlined sx={{ml:-0.5}} fontSize="small" />
      </Box>
      
    </UserContainer>
   <AvatarMenu   anchorEl={anchorEl} open={open} handleClose={handleClose}  />
    </>
  );
};

export default UserBox;
