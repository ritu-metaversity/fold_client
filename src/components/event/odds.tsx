import {  Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { colorHex } from "../../constants";

interface Props {
  title: any | string;
  setBetId: Dispatch<SetStateAction<number>>;
}

const gridProps = {
  item: true,
  height: "38px",
  xs: 1.9,
  
  borderRadius: 1,
  sx: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colorHex.lay.hover,
    },
  },
};
const gridProps2 = {
  ...gridProps,
  sx: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colorHex.back.hover,
    },
  },
};

const values = (
  <>
    <Typography fontWeight={700} mb={"-0.3rem"} fontSize="0.96rem">
      19
    </Typography>
    <Typography fontWeight={400} fontSize="0.75rem">
      26.43
    </Typography>
  </>
);

const Odds = ({ title,setBetId }: Props) => {
  const handleClick = () => {
    setBetId(1)
  }
  const handleClick2 = () => {
    setBetId(2);
  };
  return (
    <Grid container>
      <Grid
        item
        textAlign={"start"}
        xs={12}
        lg={6.6}
        display="flex"
        alignItems={"center"}
      >
        <>{title}</>
      </Grid>
      <Grid
        container
        color="black"
        item
        xs={12}
        lg={5.4}
        maxWidth={{ lg: 356, xl: 700 }}
        ml={{
          lg: "auto",
        }}
        py={{ xs: 0, lg: 0.25 }}
        display="flex"
        alignItems={"center"}
        gap={{ xs: "1%", md: "1%", lg: "1%" }}
      >
        <Grid {...gridProps2}  bgcolor={colorHex.back[3]}>
          {values}{" "}
        </Grid>
        <Grid {...gridProps2}  bgcolor={colorHex.back[2]}>
          {values}{" "}
        </Grid>
        <Grid {...gridProps2} onClick={handleClick} bgcolor={colorHex.back[1]}>
          {values}{" "}
        </Grid>
        <Grid {...gridProps} onClick={handleClick2} bgcolor={colorHex.lay[1]}>
          {values}{" "}
        </Grid>
        <Grid {...gridProps}  bgcolor={colorHex.lay[2]}>
          {values}{" "}
        </Grid>
        <Grid {...gridProps}  bgcolor={colorHex.lay[3]}>
          {values}{" "}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Odds;
