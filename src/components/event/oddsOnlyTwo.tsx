import { Grid, Typography } from "@mui/material";
import React from "react";
import { colorHex } from "../../constants";

interface Props {
  title: any | string;
}
const gridProps = {
  item: true,
  height: "38px",
  xs: 4,
  borderRadius: 1,
  sx: {
    "&:hover": {
      backgroundColor: colorHex.lay.hover,
    },
  },
  bgcolor: colorHex.lay[1],
};
const gridProps2 = {
  ...gridProps,
  sx: {
    "&:hover": {
      backgroundColor: colorHex.back.hover,
    },
  },
  bgcolor: colorHex.back[1],
};

const values = (
  <>
    <Typography fontWeight={700} mb={-0.5} fontSize="15px">
      19
    </Typography>
    <Typography fontWeight={400} fontSize="12px">
      26.43
    </Typography>
  </>
);

const OddsOnlyTwo = ({ title }: Props) => {
  return (
    <Grid
      container
      item
      xs={12}
      md={5.8}
      borderBottom="1px solid rgba(60,68,75)"
    >
      <Grid
        item
        textAlign={"start"}
        display="flex"
        alignItems={"center"}
        lg={5.7}
        xs={12}
      >
        <>{title}</>
      </Grid>
      <Grid
        container
        color="black"
        item
        xs={12}
        columns={12.2}
        lg={5.4}
        maxWidth={{ lg: 180, xl: 350 }}
        ml={{
          lg: "auto",
        }}
        py={{ xs: 0, lg: 0.25 }}
        display="flex"
        alignItems={"center"}
        gap={{ xs: "1.2%", md: "2%", lg: "2%" }}
      >
        <Grid {...gridProps2}>{values} </Grid>
        <Grid {...gridProps}>{values} </Grid>
        <Grid
          item
          xs={3.5}
          alignItems="center"
          justifyContent={"center"}
          display="flex"
        >
          {" "}
          <Typography
            fontSize="0.75rem"
            color="text.secondary"
            fontWeight={700}
            textAlign="right"
          >
            Min:100 Max:10L
          </Typography>{" "}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OddsOnlyTwo;
