/* eslint-disable react-hooks/exhaustive-deps */
import { OddsNumberTitle } from "./OddsNumberTitle";
import { OddsNumberTitleTwo } from "./OddsNumberTitleTwo";
import Odds from "./odds";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CustomizedAccordions from "./CustomizedAccordian";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import OddsOnlyTwo from "./oddsOnlyTwo";
import HomeLayout from "../layout/homeLayout";
import { BetSlip } from "./BetSlip";
import { colorHex } from "../../utils/constants";
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
import PnlModal from "./pnlModal";
import {
  BetDetailsInterface,
  BetsInterface,
  FancyOddsInterface,
  FancyPnl,
  Pnl,
  ProfitObjectInterface,
} from "./types";
import { createProfits, transformMatchOdds } from "./eventUtils";

const Event = () => {
  const [bets, setBets] = useState<BetsInterface | null>(null);
  // const [betId, setBetId] = useState(0);
  const [betDetails, setBetDetails] = useState<BetDetailsInterface | null>(
    null
  );
  const [searchParams] = useSearchParams();
  // const [loading, setLoading] = useState(false);
  const { isSignedIn, activeEventList } = useContext(UserContext);

  const matches = useMediaQuery("(min-width : 1280px)");
  const matchId = searchParams.get("match-id");
  // const [markets, setMarkets] = useState<MarketInterface[]>([]);
  const [fancyOdds, setFancyOdds] = useState<any>();
  const [pnl, setPnl] = useState<Pnl[] | null>(null);
  const [fancyPnl, setFancyPnl] = useState<FancyPnl[] | null>(null);
  const [prevFancyOdds, setPrevFancyOdds] = useState<any>();
  const [selectedPnlMarketId, setSelectedPnlMarketId] = useState("");
  const [profits, setProfits] = useState<ProfitObjectInterface>({
    Odds: {},
    Bookmaker: [],
    Fancy: [],
  });
  const nav = useNavigate();

  const getBets = async () => {
    if (!matchId || isSignedIn === false) {
      nav("/");
      return;
    }
    // setLoading(true);
    const { response } = await userServices.betListByMatch(matchId);
    if (response?.data) {
      setBets(response.data);
    }
    // setLoading(false);
  };

  const getFancyOdds = async () => {
    if (matchId) {
      const { response } = await eventServices.newFancy(matchId);

      //showing only part of the data currently
      Object.keys(response).forEach((element) => {
        if (
          !["Fancy2", "Fancy3", "Odds", "Bookmaker", "OddEven"].includes(
            element
          )
        )
          response[element] = [];
      });

      const Odds = transformMatchOdds(response.Odds);
      if (fancyOdds) {
        const newFancy = { ...fancyOdds };
        console.log("ran");
        setPrevFancyOdds(newFancy);
      } else {
        setPrevFancyOdds({ ...response, Odds });
      }
      setFancyOdds({ ...response, Odds });
    }
  };

  async function getOdds() {
    getFancyOdds();
  }

  const getPnl = async () => {
    if (!matchId) return;
    const { response } = await userServices.pnlByMatch(matchId);
    if (response?.data?.length) {
      setPnl(response.data);
    }
  };

  const getFancyPnl = async () => {
    if (!matchId) return;
    const { response } = await userServices.fancyPnlByMatch(matchId);
    if (response?.data) {
      setFancyPnl(response.data);
    }
  };

  useEffect(() => {
    getBets();
    getPnl();
    getFancyPnl();
    // getMarketIds();
    return () => {
      setBetDetails(null);
      setFancyOdds(null);
    };
  }, [isSignedIn, matchId]);

  //odds polling 0.5 sec
  useEffect(() => {
    const timer = setInterval(() => getOdds(), 4000);
    return () => clearInterval(timer);
  }, [matchId]);

  //pnl polling 5 sec
  useEffect(() => {
    const timer = setInterval(() => {
      getPnl();
      getFancyPnl();
    }, 5000);
    return () => clearInterval(timer);
  }, [matchId]);

  useEffect(() => {
    getOdds();
  }, []);

  //creating profits
  useEffect(() => {
    createProfits({
      fancyOdds,
      fancyPnl,
      betDetails,
      pnl,
      profits,
      setProfits,
    });
  }, [betDetails?.stake, pnl, fancyPnl, fancyOdds?.Odds?.marketId]);

  const currentMatch: { date: string; matchName: string; matchId: string } =
    useMemo(
      () =>
        activeEventList
          ?.reduce((acc: any[], current) => [...acc, ...current.matchList], [])
          ?.find((item: any) => item.matchId == matchId),
      [activeEventList]
    );

  if (!matchId) return <></>;
  if (!fancyOdds)
    return (
      <Box height={"100vh"}>
        <Loading />
      </Box>
    );

  const betSlip = (
    <BetSlip
      getBets={getBets}
      getFancyPnl={getFancyPnl}
      getPnl={getPnl}
      betId={betDetails}
      setBetId={setBetDetails}
      matchId={matchId}
    />
  );

  return (
    <Box m={0.3} mt={0.6}>
      <CustomizedDialog2
        title="Run Amount"
        open={Boolean(selectedPnlMarketId)}
        handleClose={() => setSelectedPnlMarketId("")}
      >
        <PnlModal fancyId={selectedPnlMarketId} matchId={matchId} />
      </CustomizedDialog2>
      <HomeLayout
        sideWidth={364}
        sideWidthXl={364}
        rightMenu={
          <Box
            borderRadius={2}
            color="text.secondary"
            p={1}
            overflow={"auto"}
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
          <Typography
            fontWeight={500}
            textOverflow={"ellipsis"}
            textTransform="uppercase"
            fontSize={{ xs: "0.8rem", lg: "0.9rem" }}
          >
            {fancyOdds?.Odds ? `${fancyOdds?.Odds[0]?.Series} > ` : ""}
            {currentMatch?.matchName}
          </Typography>
          <Typography
            fontWeight={500}
            fontSize={{ xs: "0.6rem", lg: "0.9rem" }}
          >
            {currentMatch?.date}
          </Typography>
        </GameHeader>
        {bets && <MybetMobile bets={bets}></MybetMobile>}
        <CustomizedDialog2
          title="Bet Slip"
          open={Boolean(betDetails) && !matches}
          handleClose={() => setBetDetails(null)}
        >
          {betSlip}
          {betDetails?.marketName === "Bookmaker"
            ? profits.Bookmaker?.filter(
                (item) => item?.mid === betDetails?.marketId
              ).map((profit) => <BetResult {...profit} />)
            : betDetails?.marketName &&
              profits.Odds[betDetails?.marketId]?.map((profit) => (
                <BetResult {...profit} />
              ))}
        </CustomizedDialog2>

        {fancyOdds.Odds?.map(
          (singleOdd: any, index1: any) =>
            Boolean(prevFancyOdds?.Odds[index1]) && (
              <CustomizedAccordions
                title={
                  <Box flex={1} display="flex" justifyContent={"space-between"}>
                    <Typography
                      fontSize="0.85rem"
                      lineHeight={1}
                      fontWeight={500}
                    >
                      {singleOdd.Name}
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
                  {singleOdd?.runners.map((selection: any, index: string) => (
                    <Odds
                      details={singleOdd}
                      suspended={singleOdd?.status !== "OPEN"}
                      prevValues={prevFancyOdds.Odds[index1]?.runners[index]}
                      values={selection}
                      profits={profits.Odds[singleOdd?.marketId]?.find(
                        (profit) => {
                          console.log(
                            profit.sid,
                            selection.selectionId,
                            "profit"
                          );
                          return profit.sid == selection.selectionId;
                        }
                      )}
                      setBetId={setBetDetails}
                      title={
                        <Typography fontSize={"0.85rem"}>
                          {selection.name}
                        </Typography>
                      }
                      marketName={singleOdd.Name}
                    />
                  ))}
                </Box>
              </CustomizedAccordions>
            )
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
              {fancyOdds["Bookmaker"]?.map(
                (odds: FancyOddsInterface, index: string) =>
                  odds.t !== "TOSS" && (
                    <Bookmaker
                      suspended={odds?.gstatus === "SUSPENDED"}
                      prevValues={prevFancyOdds["Bookmaker"][index]}
                      values={odds}
                      profits={profits.Bookmaker?.find(
                        (profit) => profit?.sid == odds.sid
                      )}
                      marketName={"Bookmaker"}
                      setBetId={setBetDetails}
                    />
                  )
              )}
            </Box>
          </CustomizedAccordions>
        )}
        {fancyOdds["Bookmaker"] &&
          fancyOdds.Bookmaker.find(
            (odd: FancyOddsInterface) => odd.t === "TOSS"
          ) && (
            <CustomizedAccordions
              title={
                <Box flex={1} display="flex" justifyContent={"space-between"}>
                  <Typography fontSize="0.85rem" fontWeight={500}>
                    Bookmaker Toss
                  </Typography>
                  <Typography fontSize="0.85rem" fontWeight={700}>
                    Min:100 Max:10L
                  </Typography>
                </Box>
              }
            >
              <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
                <OddsNumberTitle />
                {fancyOdds["Bookmaker"]?.map(
                  (odds: FancyOddsInterface, index: string) =>
                    odds.t === "TOSS" && (
                      <Bookmaker
                        suspended={odds?.gstatus === "SUSPENDED"}
                        prevValues={prevFancyOdds["Bookmaker"][index]}
                        values={odds}
                        profits={profits.Bookmaker?.find(
                          (profit) => profit?.sid === odds.sid
                        )}
                        marketName={"Bookmaker"}
                        setBetId={setBetDetails}
                      />
                    )
                )}
              </Box>
            </CustomizedAccordions>
          )}
        {/* accordians for fancy with values */}
        {Object.keys(fancyOdds).map((fancyMarket: any) => {
          if (["Odds", "Bookmaker"].includes(fancyMarket)) return <></>;
          if (fancyOdds[fancyMarket]?.length > 0)
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

                  {fancyOdds[fancyMarket].map(
                    (odds: FancyOddsInterface, index: number) => {
                      return (
                        <OddsOnlyTwo
                          odds={odds}
                          setMarketId={setSelectedPnlMarketId}
                          profit={profits.Fancy.find(
                            (pnl) => pnl.sid === odds.sid
                          )}
                          prevOdds={prevFancyOdds[fancyMarket].find(
                            (item: FancyOddsInterface) => item.sid === odds.sid
                          )}
                          setBetId={setBetDetails}
                          title={fancyMarket}
                          showPrice={
                            !["Fancy3", "OddEven"].includes(fancyMarket)
                          }
                        />
                      );
                    }
                  )}
                </Grid>
              </CustomizedAccordions>
            );
          return <></>;
        })}

        {/* accordians for fancy without values */}
        {/* {Object.keys(fancyOdds).map((fancyMarket: any) => {
          if (["Odds", "Bookmaker"].includes(fancyMarket)) return <></>;
          if (fancyOdds[fancyMarket]?.length === 0)
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
                </Grid>
              </CustomizedAccordions>
            );
          return <></>;
        })} */}
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
        {Number(value.toFixed(2))}
      </Typography>
    </Box>
  );
}
