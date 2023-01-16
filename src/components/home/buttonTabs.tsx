import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { colorHex } from "../../constants";

const unSelectedSx = {
  bgcolor: colorHex.bg2,
  borderColor: "unset !important",
  color: "text.primary",
};

const selectedSx = {
  // bgcolor: "secondary.main",
  color: "white",
  borderColor: "unset !important",
};

export function ButtonTabs() {
  const [current, setCurrent] = useState("exchange");
  const nav = useNavigate();
  return (
    <Box width={"calc(100% - 16px)"} m="auto">
      <ButtonGroup
        fullWidth
        sx={{
          display: {
            lg: "none",
          },
          fontSize: "0.8rem",
        }}
        color="secondary"
        variant="contained"
      >
        <Button
          onClick={() => {
            nav("/");
            setCurrent("exchange");
          }}
          sx={current === "exchange" ? selectedSx : unSelectedSx}
        >
          Exchange
        </Button>
        <Button
          onClick={() => {
            nav("/casino");
            setCurrent("live-casino");
          }}
          sx={current === "live-casino" ? selectedSx : unSelectedSx}
        >
          Live Casino
        </Button>
        {/* <Button sx={unSelectedSx}>Slot</Button>
        <Button sx={unSelectedSx}>Fantasy Games</Button> */}
      </ButtonGroup>
    </Box>
  );
}
