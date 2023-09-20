import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import { colorHex } from "../../utils/constants";
import { UserContext } from "../../App";

const unSelectedSx = {
  bgcolor: colorHex.bg2,
  borderColor: "unset !important",
  color: "text.primary",
  width: "max-content",
  display: "block",
  flex: 1,
  lineHeight: 1,
  padding: "16px 16px",
};

const selectedSx = {
  // bgcolor: "secondary.main",
  color: "white",
  padding: "16px 16px",
  flex: 1,

  lineHeight: 1,
  display: "block",
  width: "max-content",
  borderColor: "unset !important",
};

export function ButtonTabs() {
  const [current, setCurrent] = useState("exchange");
  const { isSignedIn, setModal } = useContext(UserContext);
  const nav = useNavigate();
  return (
    <Box
      width={"calc(100% - 16px)"}
      className="button_tabs_container"
      overflow={"auto"}
      m="auto"
    >
      <ButtonGroup
        sx={{
          display: {
            lg: "none",
          },
          minWidth: "100%",
          fontSize: "0.8rem",
        }}
        color="secondary"
        variant="contained"
      >
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/");
              setCurrent("exchange");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "exchange" ? selectedSx : unSelectedSx}
        >
          Exchange
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/casino");
              setCurrent("live-casino");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "live-casino" ? selectedSx : unSelectedSx}
        >
          Live Casino
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/virtual-casino");
              setCurrent("virtual-casino");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "virtual-casino" ? selectedSx : unSelectedSx}
        >
          Virtual Casino
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/slot");
              setCurrent("slot");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "slot" ? selectedSx : unSelectedSx}
        >
          Slot
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/fantasy");
              setCurrent("fantasy");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "fantasy" ? selectedSx : unSelectedSx}
        >
          Fantasy Games
        </Button>
        {/* <Button sx={unSelectedSx}>Slot</Button>
        <Button sx={unSelectedSx}>Fantasy Games</Button> */}
      </ButtonGroup>
    </Box>
  );
}
