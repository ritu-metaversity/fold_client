import { ArrowBackIosNewSharp } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import React, { FC, useState } from "react";
import { colorHex } from "../../../utils/constants";
import { AccordianSummaryTitle, TitleStyled } from "../styledComponents";

interface Props {
  bets: {
    [x: string]: any[];
  };
}

const MyBet: FC<Props> = ({ bets }) => {
  const [open, setOpen] = useState<boolean | string>(false);

  if (!(Object.keys(bets)?.length > 0)) {
    return <></>;
  }
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setOpen(isExpanded ? panel : false);
    };

  return (
    <>
      <TitleStyled>My Bets</TitleStyled>
      {Object.keys(bets).map((betCategory) => (
        <Accordion
          expanded={open === betCategory}
          onChange={handleChange(betCategory)}
          disableGutters
          square
          defaultExpanded
          sx={{
            "& :before": {
              display: "none",
            },
            m: 0,
            color: "text.secondary",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ArrowBackIosNewSharp
                style={{ rotate: "90deg", fontSize: "0.75rem" }}
              />
            }
            sx={{
              minHeight: "25px",
              backgroundColor: colorHex.bg2,
            }}
          >
            <AccordianSummaryTitle>
              {betCategory} ({bets[betCategory].length})
            </AccordianSummaryTitle>
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "0.75rem", p: 0, mx: 0, my: 1 }}>
            {getMyBets(bets[betCategory])}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export const getMyBets = (betList: any[]) =>
  betList.map((bet) => (
    <Grid
      container
      p={1}
      py={1.5}
      my={1}
      fontSize="0.8rem"
      borderLeft={`5px solid ${bet.back ? colorHex.back[1] : colorHex.lay[1]} `}
    >
      <Grid item xs={6} textAlign="left">
        {bet.nation}
      </Grid>
      <Grid item xs={3} textAlign="center">
        {bet.rate}{" "}
        {["fancy", "oddeven", "ballbyball"].find((i) =>
          bet.marketName.toLowerCase().includes(i)
        )
          ? `(${bet.priveValue})`
          : ""}
      </Grid>
      <Grid item xs={3} textAlign="right">
        {bet.amount}
      </Grid>
    </Grid>
  ));

export default MyBet;
