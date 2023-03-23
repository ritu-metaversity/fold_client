import { Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useMemo } from "react";
import {
  BetDetailsInterface,
  FancyOddsInterface,
  ProfitInterface,
} from "./types";
import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import { dharmParivartan } from ".";

interface Props {
  title: any | string;
  profit?: ProfitInterface;
  odds: FancyOddsInterface;
  setMarketId: Dispatch<SetStateAction<string>>;
  prevOdds: FancyOddsInterface;
  setBetId: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  showPrice?: Boolean;
  inverted?: Boolean;
}
const gridProps = {
  item: true,
  height: "38px",
  xs: 4,
  borderRadius: 1,
  sx: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colorHex.lay.hover,
    },
  },
  bgcolor: colorHex.lay[1],
};
const gridProps2 = {
  ...gridProps,
  sx: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colorHex.back.hover,
    },
  },
  bgcolor: colorHex.back[1],
};

const Values = (price: number, size: number, showPrice?: Boolean) => (
  <>
    <Typography fontWeight={700} mb={-0.5} fontSize="15px">
      {price || "__"}
    </Typography>
    {
      <Typography fontWeight={400} fontSize="12px">
        {price && showPrice ? size : ""}
      </Typography>
    }
  </>
);

const OddsOnlyTwo = ({
  title,
  odds,
  profit,
  prevOdds,
  setMarketId,
  setBetId,
  showPrice,
  inverted,
}: Props) => {
  const { isSignedIn, setModal } = useContext(UserContext);
  const handleClick = () => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    setBetId({
      isFancy: true,
      isBack: true,
      odds: odds.b1,
      stake: 0,
      marketName: title,
      selectionId: 0,
      priceValue: odds.bs1,
      placeTime: new Date(),
      marketId: odds.sid,
      name: odds.nation,
      matchId: "",
    });
  };

  const handleClick2 = () => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    setBetId({
      isFancy: true,
      isBack: false,
      odds: odds.l1,
      stake: 0,
      marketName: title,
      selectionId: 0,
      priceValue: odds.ls1,
      placeTime: new Date(),
      marketId: odds.sid,
      matchId: "",
      name: odds.nation,
    });
  };

  const oddsBoxes = [
    <Grid
      {...gridProps}
      className={
        prevOdds?.l1 < odds?.l1
          ? "odds-up"
          : prevOdds?.l1 > odds?.l1
          ? "odds-down"
          : ""
      }
      onClick={handleClick2}
    >
      {Values(Number(odds?.l1), odds?.ls1, showPrice)}
    </Grid>,
    <Grid
      {...gridProps2}
      className={
        prevOdds?.b1 < odds?.b1
          ? "odds-up"
          : prevOdds?.b1 > odds?.b1
          ? "odds-down"
          : ""
      }
      onClick={handleClick}
    >
      {Values(Number(odds?.b1), odds?.bs1, showPrice)}
    </Grid>,
  ];
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
        flexDirection={{ xs: "row", lg: "column" }}
        justifyContent={{ xs: "space-between", lg: "center" }}
        lg={5.7}
        xs={12}
        fontSize={"0.8rem"}
      >
        <>{odds?.nation}</>
        {profit && (
          <Typography
            color={profit?.value >= 0 ? "green" : "red"}
            fontSize={"0.8rem"}
            sx={{ cursor: "pointer" }}
            onClick={() => setMarketId(profit.sid + "")}
          >
            {Number(profit?.value?.toFixed(2))}
          </Typography>
        )}
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
        position="relative"
        className={
          "suspended" === odds.gstatus?.toLowerCase()
            ? "fancy-suspended"
            : "ball running" === odds.gstatus?.toLowerCase()
            ? "fancy-ball-running fancy-suspended"
            : ""
        }
        alignItems={"center"}
        gap={{ xs: "1.2%", md: "2%", lg: "2%" }}
      >
        {inverted ? oddsBoxes.reverse() : oddsBoxes}
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
            Min:{dharmParivartan(odds.minBet)} Max:
            {dharmParivartan(odds.maxBet)}
          </Typography>{" "}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OddsOnlyTwo;
