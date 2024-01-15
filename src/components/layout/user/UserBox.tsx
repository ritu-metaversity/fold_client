import { AvatarMenu } from "./AvatarMenu";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { UserContainer } from "../styledComponents";
import CustomizedDialog2 from "../../common/Dailog2";
import CurrentBetsForModal from "./ModalBetsCurrent";

export interface BalanceDataInterface {
  userId: number;
  balance: number;
  message: null | string;
  libality: number;
}
const UserBox = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [openBetModal, setOpenBetModal] = useState(false);
  const { user, balance: balanceData } = useContext(UserContext);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setAnchorEl(null);
    }, 500);
  };

  return (
    <>
      <CustomizedDialog2
        open={openBetModal}
        maxWidth={"lg"}
        title="Exposure"
        handleClose={() => setOpenBetModal(false)}
      >
        <CurrentBetsForModal />
      </CustomizedDialog2>
      <UserContainer
        sx={{ flexDirection: { xs: "column", lg: "row" } }}
        color="text.secondary"
        alignContent={"center"}
        alignItems={{ xs: "flex-end", lg: "center" }}
      >
        <Typography
          my="auto"
          onClick={() => setOpenBetModal(true)}
          fontSize={{ xs: "0.65rem", sm: "0.75rem", lg: "0.8rem" }}
          color={{ xs: "white", lg: "text.primary" }}
          textAlign={"center"}
          pl={{ lg: "10px" }}
          // maxWidth={{ xs: "10rem", md: "unset" }}
          // overflow="hidden"
          // textOverflow={"ellipsis"}
          sx={{ cursor: "pointer" }}
          fontWeight={{ xs: 800, lg: 500 }}
          whiteSpace="nowrap"
        >
          pts: {Number(balanceData?.balance)?.toFixed(1)} |{" "}
          {Number(balanceData?.libality)?.toFixed(1)}
        </Typography>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", lg: "center" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          gap={{ xs: 1, lg: 1.5 }}
          p={0.8}
          sx={{ cursor: "pointer" }}
          fontSize={{ xs: "0.75rem", lg: "0.8rem" }}
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
