import React from "react";
import { Button, ButtonGroup, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { colorHex } from "../../constants";

const unSelectedSx = {
  bgcolor: colorHex.bg2,
  borderColor: "unset !important",
  color: "text.primary",
};

const selectedSx = {
  bgcolor: "secondary.main",
  color: "white",
  borderColor: "unset !important",
};

export function ButtonTabs() {
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
        variant="text"
      >
        <Button sx={selectedSx}>Exchange</Button>
        <Button sx={unSelectedSx}>Live Casino</Button>
        {/* <Button sx={unSelectedSx}>Slot</Button>
        <Button sx={unSelectedSx}>Fantasy Games</Button> */}
      </ButtonGroup>
    </Box>
  );
}
