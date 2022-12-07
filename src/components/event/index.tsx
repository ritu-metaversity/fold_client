import { OddsNumberTitle } from './OddsNumberTitle';
import { OddsNumberTitleTwo } from './OddsNumberTitleTwo';
import Odds from "./odds";
import { Box } from "@mui/system";
import React from "react";
import CustomizedAccordions from "./CustomizedAccordian";
import { Grid, Typography } from "@mui/material";
import OddsOnlyTwo from "./oddsOnlyTwo";
import { colorHex } from "../../constants";


const Event = () => {
  const { title } = {
    title: <Typography fontSize={"0.85rem"}>Pakistan</Typography>,
  };

  return (
    <Box m={0.3}>
      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" lineHeight={1} fontWeight={500}>
              MATCH_ODDS
            </Typography>
            <Typography fontSize="0.85rem" lineHeight={1} fontWeight={700}>
              Max: 10k
            </Typography>
          </Box>
        }
      >
        <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
          <OddsNumberTitle />
          <Odds title={title} />
          <Odds title={title} />
          <Odds title={title} />
        </Box>
      </CustomizedAccordions>
      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" fontWeight={500}>
              Bookmaker
            </Typography>
            <Typography fontSize="0.85rem" fontWeight={700}>
              Min:100 Max:10L
            </Typography>
          </Box>
        }
      >
        <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
          <OddsNumberTitle />
          <Odds title={title} />
          <Odds title={title} />
          <Odds title={title} />
        </Box>
      </CustomizedAccordions>

      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" fontWeight={500}>
              Normal
            </Typography>
          </Box>
        }
      >
        <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
          <OddsNumberTitleTwo />
          <OddsNumberTitleTwo />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
        </Grid>
      </CustomizedAccordions>
      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" fontWeight={500}>
              Over By Over
            </Typography>
          </Box>
        }
      >
        <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
          <OddsNumberTitleTwo />
          <OddsNumberTitleTwo />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
        </Grid>
      </CustomizedAccordions>
      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" fontWeight={500}>
              Meter
            </Typography>
          </Box>
        }
      >
        <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
          <OddsNumberTitleTwo />
          <OddsNumberTitleTwo />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
        </Grid>
      </CustomizedAccordions>
      <CustomizedAccordions
        title={
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Typography fontSize="0.85rem" fontWeight={500}>
              Fancy
            </Typography>
          </Box>
        }
      >
        <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
          <OddsNumberTitleTwo />
          <OddsNumberTitleTwo />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
          <OddsOnlyTwo title={title} />
        </Grid>
      </CustomizedAccordions>
    </Box>
  );
};

export default Event;

