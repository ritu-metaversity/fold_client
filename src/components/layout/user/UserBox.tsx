import { AvatarMenu } from "./AvatarMenu";
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
      <UserContainer
        sx={{ flexDirection: { xs: "column", lg: "row" } }}
        color="text.secondary"
        alignContent={"center"}
        alignItems={"center"}
        // gap={{lg:1.25}}
      >
        <Typography
          my="auto"
          fontSize={{ xs: "0.75rem", lg: "0.8rem" }}
          color={{ xs: "white", lg: "text.primary" }}
          textAlign={"center"}
          pl={{ lg: "10px" }}
          fontWeight={{ xs: 800, lg: 500 }}
          whiteSpace="nowrap"
        >
          pts: 0 | 0
        </Typography>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", lg: "center" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          gap={{ xs: 1, lg: 1.5 }}
          p={0.8}
          fontSize={{ xs: "1rem", lg: "0.8rem" }}
          onClick={handleClick}
        >
          <Avatar
            color="gray.100"
            sx={{
              my: "auto",
              maxWidth: { xs: "1rem", lg: "2rem" },
              maxHeight: { xs: "1rem", lg: "2rem" },
            }}
          ></Avatar>

          {user?.username}
          <KeyboardArrowDownOutlined
            sx={{ ml: -1, my: "auto", fontSize: "1rem" }}
          />
        </Box>
      </UserContainer>
      <AvatarMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
};

export default UserBox;
