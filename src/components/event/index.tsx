/* eslint-disable react-hooks/exhaustive-deps */
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
import MyBet from "./MyBet";
import { userServices } from "../../utils/api/user/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { eventServices } from "../../utils/api/event/services";
import Loading from "../layout/loading";
import MybetMobile from "./MybetMobile";
import CustomizedDialog2 from "../common/Dailog2";
import { GameHeader } from "./styledComponents";
import Bookmaker from "./bookmaker";
import { sportsTabList } from "../home/sportsTabList";

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
export interface MarketInterface {
  type: string;
  marketId: string;
}
export interface BetDetailsInterface {
  isBack: boolean;
  odds: number;
  stake: number;
  selectionId: number | string;
  marketId: string | number;
  matchId: string;
  marketName?: string;
  placeTime: Date;
  priceValue: number;
  isFancy: boolean;
  name?: string;
}
export interface FancyOddsInterface {
  sid: string;
  nation: string;
  b1: number;
  bs1: number;
  l1: number;
  ls1: number;
  gstatus: string;
}

const transformMatchOdds = (odds: any) => {
  if (!odds.length) {
    return null;
  }
  const newOdds = {
    ...odds[0],
  };
  // managing for dynamic no of odds
  newOdds.runners = odds[0].runners.map((item: any) => {
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
  return newOdds;
};
export interface ProfitInterface {
  value: number;
  sid?: string | number;
  title: string;
}

const Event = () => {
  const [bets, setBets] = useState<BetsInterface | null>(null);
  // const [betId, setBetId] = useState(0);
  const [betDetails, setBetDetails] = useState<BetDetailsInterface | null>(
    null
  );
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { isSignedIn, activeEventList } = useContext(UserContext);
  const { title } = {
    title: <Typography fontSize={"0.85rem"}>Pakistan</Typography>,
  };
  const matches = useMediaQuery("(min-width : 1280px)");
  const matchId = searchParams.get("match-id");
  // const [markets, setMarkets] = useState<MarketInterface[]>([]);
  const [fancyOdds, setFancyOdds] = useState<any>();
  const [prevFancyOdds, setPrevFancyOdds] = useState<any>();
  const [profits, setProfits] = useState<ProfitInterface[]>([]);
  const nav = useNavigate();
  const getBets = async () => {
    if (!matchId || isSignedIn===false) {
      nav("/");
      return;
    }
    setLoading(true);
    const { response } = await userServices.betListByMatch(matchId);
    if (response?.data) {
      setBets(response.data);
    }
    setLoading(false);
  };

  const createProfits = () => {
    if (betDetails?.stake) {
      const { isBack, odds, stake } = betDetails;
      if (betDetails?.marketName === "Match Odds") {
        const newProfits: ProfitInterface[] = [];
        fancyOdds.Odds?.runners?.forEach((element: any) => {
          if (element.selectionId === betDetails?.selectionId) {
            newProfits.push({
              title: element.selectionId,
              value: (isBack ? 1 : -1) * (odds - 1) * stake,
              sid: element.selectionId,
            });
          } else {
            newProfits.push({
              title: element.selectionId,
              value: (isBack ? -1 : 1) * stake,
              sid: element.selectionId,
            });
          }
        });
        setProfits(newProfits);
      } else if (betDetails?.marketName === "Bookmaker") {
        fancyOdds.Bookmaker.map((element: FancyOddsInterface) => {
          if (element.sid === betDetails?.selectionId) {
            return {
              title: element.nation,
              value: (isBack ? 1 : -1) * (odds - 1) * stake,
              sid: element.sid,
            };
          } else {
            return {
              title: element.nation,
              value: (isBack ? -1 : 1) * stake,
              sid: element.sid,
            };
          }
        });
      }
    } else {
      setProfits([]);
    }
  };

  const getFancyOdds = async () => {
    if (matchId) {
      const { response } = await eventServices.fancyOdds(matchId);
      const Odds = transformMatchOdds(response.Odds);
      if (fancyOdds) {
        setPrevFancyOdds(fancyOdds);
      } else {
        setPrevFancyOdds({ ...response, Odds });
      }
      setFancyOdds({ ...response, Odds });
    }
  };
  async function getOdds() {
    getFancyOdds();
  }

  useEffect(() => {
    getBets();
    // getMarketIds();
    return () => {};
  }, [isSignedIn, matchId]);

  //odds
  useEffect(() => {
    const timer = setTimeout(() => getOdds(), 500);
    return () => clearInterval(timer);
  }, [matchId, fancyOdds]);

  useEffect(() => {
    getOdds();
  }, []);

  useEffect(() => {
    createProfits();
  }, [betDetails?.stake]);

  if (!matchId) return <></>;

  if (loading || !fancyOdds)
    return (
      <Box height={"100vh"}>
        <Loading />
      </Box>
    );
  const betSlip = (
    <BetSlip
      setProfits={setProfits}
      betId={betDetails}
      setBetId={setBetDetails}
      matchId={matchId}
    />
  );
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
            {betSlip}
            {bets && <MyBet bets={bets} />}
          </Box>
        }
      >
        <GameHeader
          bgcolor={
            sportsTabList.find(
              (sportTab) =>
                sportTab.name ===
                activeEventList?.find((item) =>
                  item.matchList.find(
                    (item2) => item2.matchId === Number(matchId)
                  )
                )?.sportName
            )?.color
          }
        >
          {
            activeEventList
              ?.reduce(
                (acc: any[], current) => [...acc, ...current.matchList],
                []
              )
              ?.find((item: any) => item.matchId == matchId)?.matchName
          }
        </GameHeader>
        {bets && <MybetMobile bets={bets}></MybetMobile>}
        <CustomizedDialog2
          title="Bet Slip"
          open={Boolean(betDetails) && !matches}
          handleClose={() => setBetDetails(null)}
        >
          {betSlip}
          {profits.map((profit) => (
            <BetResult {...profit} />
          ))}
        </CustomizedDialog2>

        {fancyOdds.Odds ? (
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
              {fancyOdds.Odds?.runners.map((selection: any, index: string) => (
                <Odds
                  details={fancyOdds.Odds}
                  suspended={fancyOdds.Odds?.status !== "OPEN"}
                  prevValues={prevFancyOdds.Odds?.runners[index]}
                  values={selection}
                  profits={profits?.find(
                    (profit) => profit.sid === selection.selectionId
                  )}
                  setBetId={setBetDetails}
                  title={title}
                  marketName={"Match Odds"}
                />
              ))}
            </Box>
          </CustomizedAccordions>
        ) : (
          ""
        )}

        {fancyOdds["Bookmaker"] && (
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
              {fancyOdds["Bookmaker"]?.map((odds: any, index: string) => (
                <Bookmaker
                  suspended={odds?.gstatus === "SUSPENDED"}
                  prevValues={prevFancyOdds["Bookmaker"][index]}
                  values={odds}
                  profits={profits?.find((profit) => profit.sid === odds.sid)}
                  marketName={"Bookmaker"}
                  setBetId={setBetDetails}
                />
              ))}
            </Box>
          </CustomizedAccordions>
        )}

        {Object.keys(fancyOdds).map((fancyMarket: any) => {
          if (["Odds", "Bookmaker"].includes(fancyMarket)) {
            return <></>;
          }
          return (
            <CustomizedAccordions
              title={
                <Box flex={1} display="flex" justifyContent={"space-between"}>
                  <Typography fontSize="0.85rem" fontWeight={500}>
                    {fancyMarket}
                  </Typography>
                </Box>
              }
            >
              <Grid
                container
                pb={{ xs: 1 }}
                px={{ xs: 1.5 }}
                gap={{ md: "3%" }}
              >
                <OddsNumberTitleTwo />
                <OddsNumberTitleTwo />

                {["Fancy", "Fancy2", "Fancy3"].includes(fancyMarket) &&
                  fancyOdds[fancyMarket].map(
                    (odds: FancyOddsInterface, index: number) => {
                      return (
                        <OddsOnlyTwo
                          odds={odds}
                          prevOdds={prevFancyOdds[fancyMarket].find(
                            (item: FancyOddsInterface) => item.sid === odds.sid
                          )}
                          setBetId={setBetDetails}
                          title={fancyMarket}
                        />
                      );
                    }
                  )}
              </Grid>
            </CustomizedAccordions>
          );
        })}
      </HomeLayout>
    </Box>
  );
};

export default Event;

function BetResult({ value, title }: { value: number; title: string }) {
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
  