import { Grid, Typography } from "@mui/material";
import { colorHex } from "../../utils/constants";
import React from "react";
import { dharmParivartan } from ".";

const gridProps = {
  item: true,
  xs: 1.9,
  fontSize: "0.8rem",
  borderRadius: 1,
  // sx: {
  //   "&:hover": {
  //     backgroundColor: colorHex.lay.hover,
  //   },
  // },
  bgcolor: colorHex.lay[3],
};
const gridProps2 = {
  ...gridProps,
  // sx: {
  //   "&:hover": {
  //     backgroundColor: colorHex.back.hover,
  //   },
  // },
  bgcolor: colorHex.back[3],
};

interface Props {
  singleOdd: any;
}

export function OddsNumberTitle({ singleOdd }: Props) {
  const { minBet, maxBet, betDelay } = singleOdd;
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
        color="white"
        ml={{ lg: "auto" }}
        py={{ lg: 0.25 }}
        display="flex"
        alignItems={"center"}
        gap="1%"
      >
        <Grid item xs={3.9}>
          <Typography
            fontSize="0.7rem"
            lineHeight={1}
            color="text.secondary"
            fontWeight={700}
          >
            Max: {dharmParivartan(maxBet)}
            {`   Min`}:{dharmParivartan(minBet)}
            {`   Bet Delay`}: {betDelay}
          </Typography>
        </Grid>
        <Grid {...gridProps2}>Back</Grid>
        <Grid {...gridProps}>Lay</Grid>
      </Grid>
    </Grid>
  );
}
