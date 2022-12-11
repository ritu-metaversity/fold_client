import { Grid } from "@mui/material";
import { colorHex } from "../../constants";
import React from "react";

const gridProps = {
  item: true,
  xs: 1.9,
  fontSize: "0.8rem",
  borderRadius: 1,
  sx: {
    "&:hover": {
      backgroundColor: colorHex.lay.hover,
    },
  },
  bgcolor: colorHex.lay[3],
};
const gridProps2 = {
  ...gridProps,
  sx: {
    "&:hover": {
      backgroundColor: colorHex.back.hover,
    },
  },
  bgcolor: colorHex.back[3],
};

export function OddsNumberTitle() {
  return (
    <Grid container display={{ xs: "none", lg: "flex" }}>
      <Grid
        container
        item
        xs={12}
        lg={5.4}
        maxWidth={{
          lg: 356,
          xl: 700,
        }}
        ml={{lg: "auto"}}
        py={{lg: 0.25}}
        display="flex"
        alignItems={"center"}
        gap="1%"
      >
        <Grid item xs={3.9}></Grid>
        <Grid {...gridProps2} >Back</Grid>
        <Grid {...gridProps}  >Lay</Grid>
      </Grid>
    </Grid>
  );
}
