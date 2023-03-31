import { Grid } from "@mui/material";
import React from "react";
import { colorHex } from "../../../utils/constants";

const gridProps = {
  item: true,
  xs: 4,
  fontSize: "0.8rem",
  borderRadius: 1,
  // sx: {
  //   "&:hover": {
  //     backgroundColor: colorHex.lay.hover,
  //   },
  // },
  bgcolor: colorHex.lay[3],
};

const gridProps1 = {
  ...gridProps,
  // sx: {
  //   "&:hover": {
  //     backgroundColor: colorHex.back.hover,
  //   },
  // },
  bgcolor: colorHex.back[3],
};
const oddBoxes = [
  <Grid {...gridProps}>No</Grid>,
  <Grid {...gridProps1}>Yes</Grid>,
];

const oddBoxes2 = [
  <Grid {...gridProps1}>Back</Grid>,
  <Grid {...gridProps}>Lay</Grid>,
];
export function OddsNumberTitleTwo({ inverted }: { inverted?: Boolean }) {
  return (
    <Grid container item md={5.8} display={{ xs: "none", lg: "flex" }}>
      <Grid
        container
        item
        xs={12}
        columns={12.2}
        lg={5.4}
        maxWidth={{
          lg: 180,
          xl: 350,
        }}
        ml={{ lg: "auto" }}
        color="white"
        py={{ xs: 0, lg: 0.25 }}
        display="flex"
        alignItems={"center"}
        gap={{
          xs: "1.2%",
          md: "2%",
          lg: "2%",
        }}
      >
        {inverted ? oddBoxes2 : oddBoxes}
        {/* <Grid {...gridProps}>No</Grid>
        <Grid {...gridProps1}>Yes</Grid> */}
      </Grid>
    </Grid>
  );
}
