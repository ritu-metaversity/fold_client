import { Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { BetDetailsInterface, FancyOddsInterface, ProfitInterface } from ".";
import { UserContext } from "../../App";
import { colorHex } from "../../constants";
import "./animation.css";
import Odds from "./odds";

interface Props {
  values: FancyOddsInterface;
  suspended?: boolean;
  prevValues: FancyOddsInterface;
  marketName?: string;
  setBetId: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  profits?: ProfitInterface;
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

const ValuesComponent = ({
  price,
  size,
  suspended,
}: {
  price: number;
  size: number;
  suspended: boolean;
}) => (
  <>
    <Typography fontWeight={700} mb={"-0.3rem"} fontSize="0.96rem">
      {(!suspended && price) || "__"}
    </Typography>
    <Typography fontWeight={400} fontSize="0.75rem">
      {!suspended && price ? size : ""}
    </Typography>
  </>
);

const Bookmaker = ({
  setBetId,
  suspended,
  values,
  marketName,
  prevValues,
  profits,
}: Props) => {
  const { isSignedIn, setModal } = useContext(UserContext);
  const handleClick = (odds: number) => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    if (!odds) return;
    setBetId({
      isFancy: false,
      isBack: true,
      odds,
      stake: 0,
      name: values.nation,
      marketName,
      selectionId: Number(values.sid),
      priceValue: odds,
      placeTime: new Date(),
      marketId: Number(values.sid),
      matchId: "",
    });
  };
  const handleClick2 = (odds: number) => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    if (!odds) return;

    setBetId({
      isFancy: false,
      isBack: false,
      selectionId: values.sid,
      odds,
      name: values.nation,
      marketName,
      stake: 0,
      priceValue: odds,
      placeTime: new Date(),
      marketId: Number(values.sid),
      matchId: "",
    });
  };

  if (!(values && prevValues)) {
    return <></>;
  }
  const availableToBack = [
      { price: values.b1, size: values.bs1 },
      { price: "", size: "" },
      { price: "", size: "" },
    ],
    availableToLay = [
      { price: values.l1, size: values.ls1 },
      { price: "", size: "" },
      { price: "", size: "" },
    ],
    prevBack = [
      { price: prevValues.b1, size: prevValues.bs1 },
      { price: "", size: "" },
      { price: "", size: "" },
    ],
    prevLay = [
      { price: prevValues.l1, size: prevValues.ls1 },
      { price: "", size: "" },
      { price: "", size: "" },
    ];

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
        <Typography fontSize={"0.85rem"}>{values.nation}</Typography>
        {profits && (
          <Typography
            color={profits?.value >= 0 ? "green" : "red"}
            fontSize={"0.8rem"}
            mr={0.5}
            display={{ xs: "none", lg: "block" }}
          >
            {profits?.value?.toFixed(2)}
          </Typography>
        )}
      </Grid>
      <Grid
        container
        color="black"
        item
        className={suspended ? "suspended" : ""}
        xs={12}
        lg={5.4}
        maxWidth={{ lg: 356, xl: 700 }}
        ml={{ lg: "auto" }}
        py={{ xs: 0, lg: 0.25 }}
        display="flex"
        alignItems={"center"}
        position="relative"
        gap={{ xs: "1%", md: "1%", lg: "1%" }}
      >
        {availableToBack.length === 1 && (
          <>
            <Grid {...gridProps2}></Grid>
            <Grid {...gridProps2}></Grid>
          </>
        )}
        {availableToBack
          .map((back: any, index: number) => (
            <Grid
              {...gridProps2}
              className={
                prevBack[index].price < back.price
                  ? "odds-up"
                  : prevBack[index].price > back.price
                  ? "odds-down"
                  : ""
              }
              onClick={() => handleClick(back.price)}
              bgcolor={colorHex.backArr[index]}
            >
              <ValuesComponent suspended={suspended} {...back} />
            </Grid>
          ))
          .reverse()}

        {availableToLay.map((lay: any, index: number) => (
          <Grid
            {...gridProps}
            className={
              prevLay[index].price < lay.price
                ? "odds-up"
                : prevLay[index].price > lay.price
                ? "odds-down"
                : ""
            }
            bgcolor={colorHex.layArr[index]}
            onClick={() => handleClick2(lay.price)}
          >
            <ValuesComponent suspended={suspended} {...lay} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Bookmaker;
