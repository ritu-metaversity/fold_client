import { OddsNumberTitle } from './OddsNumberTitle';
import { OddsNumberTitleTwo } from './OddsNumberTitleTwo';
import Odds from "./odds";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import CustomizedAccordions from "./CustomizedAccordian";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import OddsOnlyTwo from "./oddsOnlyTwo";
import HomeLayout from "../layout/homeLayout";
import { BetSlip } from "./BetSlip";
import { colorHex } from "../../constants";
import MyBet from './MyBet';
import CustomizedDialog2 from "../common/Dailog2";
import MybetMobile from './MybetMobile';
import { userServices } from '../../utils/api/user/services';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { eventServices } from "../../utils/api/event/services";

const bets = {
  fancy: [
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "back",
    },
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "lay",
    },
  ],
  Bookmaker: [
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "lay",
    },
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "back",
    },
  ],
};

interface BetsInterface {
  [x: string]: {
    nation: string;
    rate: number;
    amount: number;
    priveValue: number;
    marketName: string;
    back: boolean;
  }[];
}
interface MarketInterface {
  type: string;
  marketId: string;
}
const value = -1;
const Event = () => {
  const [bets, setBets] = useState<BetsInterface | null>(null);
  const [betId, setBetId] = useState(0);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useContext(UserContext);
  const { title } = {
    title: <Typography fontSize={"0.85rem"}>Pakistan</Typography>,
  };
  const matches = useMediaQuery("(min-width : 1280px)");
  const matchId = searchParams.get("match-id");
  const [markets, setMarkets] = useState<MarketInterface[]>([]);
  const [prevOdds, setPrevOdds] = useState<any>({});
  //   [
  //   {
  //     runners: [
  //       {
  //         selectionId: "7659",
  //         ex: {
  //           availableToBack: [
  //             { price: 6.6, size: 372.0 },
  //             { price: 6.4, size: 773.0 },
  //             { price: 6.9, size: 551.0 },
  //           ],
  //           availableToLay: [
  //             { price: 7.9, size: 188.0 },
  //             { price: 7.0, size: 1524.0 },
  //             { price: 7.2, size: 228.0 },
  //           ],
  //         },
  //       },
  //       {
  //         selectionId: "414464",
  //         ex: {
  //           availableToBack: [
  //             { price: 1.36, size: 8032.0 },
  //             { price: 1.35, size: 29593.0 },
  //             { price: 1.34, size: 1300.0 },
  //           ],
  //           availableToLay: [
  //             { price: 1.37, size: 4060.0 },
  //             { price: 1.38, size: 908.0 },
  //             { price: 1.39, size: 3773.0 },
  //           ],
  //         },
  //       },
  //       {
  //         selectionId: "60443",
  //         ex: {
  //           availableToBack: [
  //             { price: 8.2, size: 219.0 },
  //             { price: 8.0, size: 922.0 },
  //             { price: 7.8, size: 195.0 },
  //           ],
  //           availableToLay: [
  //             { price: 8.6, size: 481.0 },
  //             { price: 8.8, size: 20.0 },
  //             { price: 9.0, size: 1109.0 },
  //           ],
  //         },
  //       },
  //     ],
  //     marketId: "1.207796438",
  //     isMarketDataDelayed: false,
  //     status: "OPEN",
  //     inplay: false,
  //     lastMatchTime: "2022-12-21T11:22:17.000Z",
  //   },
  // ]
  // );
  const [odds, setOdds] = useState<any>({});
  //   [
  //   {
  //     runners: [
  //       {
  //         selectionId: "7659",
  //         ex: {
  //           availableToBack: [
  //             { price: 6.8, size: 46.0 },
  //             { price: 6.6, size: 850.0 },
  //             { price: 6.4, size: 958.0 },
  //           ],
  //           availableToLay: [
  //             { price: 7.0, size: 267.0 },
  //             { price: 7.2, size: 1512.0 },
  //             { price: 7.4, size: 228.0 },
  //           ],
  //         },
  //       },
  //       {
  //         selectionId: "414464",
  //         ex: {
  //           availableToBack: [
  //             { price: 1.36, size: 8063.0 },
  //             { price: 1.35, size: 29972.0 },
  //             { price: 1.34, size: 1112.0 },
  //           ],
  //           availableToLay: [
  //             { price: 1.37, size: 3049.0 },
  //             { price: 1.38, size: 1446.0 },
  //             { price: 1.39, size: 2709.0 },
  //           ],
  //         },
  //       },
  //       {
  //         selectionId: "60443",
  //         ex: {
  //           availableToBack: [
  //             { price: 8.2, size: 218.0 },
  //             { price: 8.0, size: 911.0 },
  //             { price: 7.8, size: 266.0 },
  //           ],
  //           availableToLay: [
  //             { price: 8.4, size: 61.0 },
  //             { price: 8.6, size: 36.0 },
  //             { price: 8.8, size: 120.0 },
  //           ],
  //         },
  //       },
  //     ],
  //     marketId: "1.207796438",
  //     isMarketDataDelayed: false,
  //     status: "OPEN",
  //     inplay: false,
  //     lastMatchTime: "2022-12-21T10:35:26.000Z",
  //   },
  // ]);

  // useEffect(() => {
  //   setInterval(() => {
  //     const prev = [...prevOdds];
  //     const newe = [...odds];
  //     setPrevOdds(newe);
  //     setOdds(prev);
  //   }, 10000);
  // }, []);

  const getBets = async () => {
    if (!matchId || !isSignedIn) return;
    setLoading(true);
    const { response } = await userServices.betListByMatch(matchId);
    if (response?.data) {
      setBets(response.data);
    }
    setLoading(false);
  };

  const getMarketIds = async () => {
    if (!matchId || !isSignedIn) return;
    setLoading(true);
    const { response } = await eventServices.marketId({ matchId });
    if (response?.data) {
      setMarkets(response.data.marketList);
    }
    setLoading(false);
  };

  async function getOdds() {
    markets.forEach(async (market) => {
      const { response } = await eventServices.odds(market.marketId);
      if (response) {
        if (!odds[market.type]) {
          setPrevOdds((o: any) => ({ ...o, [market.type]: response[0] }));
        } else {
          const prevOdds = { ...odds };
          setPrevOdds(prevOdds);
        }
        const newOdds = {
          ...response[0],
        };

        // managing for dynamic no of odds
        newOdds.runners = response[0].runners.map((item: any) => {
          item.ex.availableToBack = [
            ...item.ex.availableToBack,
            { price: "", size: "" },
            { price: "", size: "" },
            { price: "", size: "" },
          ].slice(0, 3);
          item.ex.availableToLay = [
            ...item.ex.availableToLay,
            { price: "", size: "" },
            { price: "", size: "" },
            { price: "", size: "" },
          ].slice(0, 3);
          return item;
        });

        setOdds((o: any) => ({
          ...o,
          [market.type]: newOdds,
        }));
      }
    });
  }

  useEffect(() => {
    getBets();
    getMarketIds();
    return () => {};
  }, [isSignedIn]);

  //odds
  useEffect(() => {
    // getOdds();
    const timer = setTimeout(() => getOdds(), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [markets, odds]);

  useEffect(() => {
    getOdds();
  }, [markets]);

  if (!matchId) return <></>;
  return (
    <Box m={0.3} mt={0.6}>
      <HomeLayout
        sideWidth={364}
        sideWidthXl={364}
        rightMenu={
          <Box
            borderRadius={2}
            color="text.secondary"
            p={1}
            bgcolor={colorHex.bg1}
            height={"100%"}
          >
            <BetSlip betId={betId} setBetId={setBetId} />
            {bets && <MyBet bets={bets} />}
          </Box>
        }
      >
        {/* {bets && <MybetMobile bets={bets}></MybetMobile>} */}
        {/* <CustomizedDialog2
          title="Bet Slip"
          open={Boolean(betId) && !matches}
          handleClose={() => setBetId(0)}
        >
          <BetSlip betId={betId} setBetId={setBetId} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
        </CustomizedDialog2> */}

        {
          // markets.find((market) => market.type === "Match Odds")
          // &&
          odds["Match Odds"] ? (
            <CustomizedAccordions
              title={
                <Box flex={1} display="flex" justifyContent={"space-between"}>
                  <Typography
                    fontSize="0.85rem"
                    lineHeight={1}
                    fontWeight={500}
                  >
                    MATCH_ODDS
                  </Typography>
                  <Typography
                    fontSize="0.85rem"
                    lineHeight={1}
                    fontWeight={700}
                  >
                    Max: 10k
                  </Typography>
                </Box>
              }
            >
              <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
                <OddsNumberTitle />
                {odds["Match Odds"]?.runners.map(
                  (selection: any, index: string) => (
                    <Odds
                      suspended={odds["Match Odds"]?.status !== "OPEN"}
                      prevValues={prevOdds["Match Odds"]?.runners[index]}
                      values={selection}
                      setBetId={setBetId}
                      title={title}
                    />
                  )
                )}
              </Box>
            </CustomizedAccordions>
          ) : (
            ""
          )
        }

        {markets.find((market) => market.type === "Bookmaker") && (
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
            {/* <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
              <OddsNumberTitle />
              {odds[0].runners.map((selection: any, index: string) => (
                <Odds
                  suspended={odds[0].status !== "OPEN"}
                  prevValues={prevOdds[0].runners[index]}
                  values={selection}
                  setBetId={setBetId}
                  title={title}
                />
              ))}
            </Box> */}
          </CustomizedAccordions>
        )}

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
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
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
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
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
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
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
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
          </Grid>
        </CustomizedAccordions>
      </HomeLayout>
    </Box>
  );
};

export default Event;


    function BetResult({value, title}:{value:number, title:string}) {
      return (
        <Box display="flex" m={1} justifyContent={"space-between"}>
          <Typography color="text.secondary" fontSize={"0.8rem"}>
            {title}
          </Typography>
          <Typography color={value >= 0 ? "green" : "red"} fontSize={"0.8rem"}>
            {value}
          </Typography>
        </Box>
      );
    }
  