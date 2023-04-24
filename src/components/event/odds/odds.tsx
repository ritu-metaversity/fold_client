import { Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { BetDetailsInterface, ProfitInterface } from "../types";
import { UserContext } from "../../../App";
import { colorHex } from "../../../utils/constants";
import "../animation.css";
interface Props {
  title: any | string;
  values: any;
  suspended?: boolean;
  prevValues: any;
  details: any;
  profits?: ProfitInterface;
  marketName?: string;
  setBetId: Dispatch<SetStateAction<BetDetailsInterface | null>>;
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
    <Typography
      sx={{
        zIndex: 100,
        // textShadow: "1.5px 1.5px 8px rgba(255, 255, 255, .5)",
      }}
      fontWeight={800}
      mb={"-0.3rem"}
      fontSize="0.96rem"
    >
      {price || "__"}
    </Typography>
    <Typography fontWeight={400} fontSize="0.75rem">
      {price ? size : ""}
    </Typography>
  </>
);

const Odds = ({
  details,
  title,
  setBetId,
  suspended,
  profits,
  values,
  marketName,
  prevValues,
}: Props) => {
  const { isSignedIn, setModal } = useContext(UserContext);
  const handleClick = (odds: number) => {
    if (!isSignedIn) {
      if (setModal) {
        setModal({ login: true });
        return;
      }
    }
    if (!(odds > 0)) {
      return;
    }
    setBetId({
      isFancy: false,
      isBack: true,
      odds,
      stake: 0,
      name: values.name,
      marketName,
      selectionId: values.selectionId,
      priceValue: odds,
      placeTime: new Date(),
      marketId: details.marketId,
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
    if (!(odds > 0)) {
      return;
    }
    setBetId({
      isFancy: false,
      isBack: false,
      selectionId: values.selectionId,
      odds,
      name: values.name,
      marketName,
      stake: 0,
      priceValue: odds,
      placeTime: new Date(),
      marketId: details.marketId,
      matchId: "",
    });
  };

  if (!(values?.ex && prevValues?.ex)) {
    return <></>;
  }

  const { availableToBack, availableToLay } = values?.ex;
  const { availableToBack: prevBack, availableToLay: prevLay } = prevValues?.ex;
  // console.log(prevBack, availableToBack, "back");
  return (
    <Grid container>
      <Grid
        item
        textAlign={"start"}
        xs={12}
        lg={6.6}
        flex={{ lg: 1 }}
        maxWidth={{ lg: "unset" }}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography color="text.secondary" fontSize={"0.8rem"}>
          {title}
        </Typography>
        {profits && (
          <Typography
            color={profits?.value >= 0 ? "green" : "red"}
            fontSize={"0.8rem"}
            mr={0.5}
          >
            {Number(profits?.value?.toFixed(2))}
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
        // ml={{ lg: "auto" }}
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
              onClick={() => index === 0 && handleClick(back.price)}
              bgcolor={colorHex.backArr[index]}
            >
              <ValuesComponent {...back} />
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
            onClick={() => index === 0 && handleClick2(lay.price)}
          >
            <ValuesComponent {...lay} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Odds;
