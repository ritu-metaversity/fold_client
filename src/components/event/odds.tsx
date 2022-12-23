import {  Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserContext } from "../../App";
import { colorHex } from "../../constants";
import "./animation.css";
interface Props {
  title: any | string;
  values: any;
  suspended?: boolean;
  prevValues: any;
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

const ValuesComponent = ({ price, size }: { price: number; size: number }) => (
  <>
    <Typography fontWeight={700} mb={"-0.3rem"} fontSize="0.96rem">
      {price|| "__"}
    </Typography>
    <Typography fontWeight={400} fontSize="0.75rem">
      {size}
    </Typography>
  </>
);

const Odds = ({ title, setBetId, suspended, values, prevValues }: Props) => {
  const { isSignedIn, setModal } = useContext(UserContext);
  const handleClick = () => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    setBetId(1);
  };
  const handleClick2 = () => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    setBetId(2);
  };

  const { availableToBack, availableToLay } = values.ex;
  const { availableToBack: prevBack, availableToLay: prevLay } = prevValues?.ex;

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
              bgcolor={colorHex.backArr[index]}
            >
              <ValuesComponent {...back} />
            </Grid>
          ))
          .reverse()}

        {availableToLay.map((lay: any, index: number) => (
          <Grid
            {...gridProps2}
            className={
              prevLay[index].price < lay.price
                ? "odds-up"
                : prevLay[index].price > lay.price
                ? "odds-down"
                : ""
            }
            bgcolor={colorHex.layArr[index]}
          >
            <ValuesComponent {...lay} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Odds;
