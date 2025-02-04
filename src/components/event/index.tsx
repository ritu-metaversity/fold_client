/* eslint-disable react-hooks/exhaustive-deps */
import { OddsNumberTitle } from "./odds/OddsNumberTitle";
import { OddsNumberTitleTwo } from "./odds/OddsNumberTitleTwo";
import Odds from "./odds/odds";


import { Box } from "@mui/system";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CustomizedAccordions from "./CustomizedAccordian";
import { Grid, Typography, styled, useMediaQuery } from "@mui/material";
import OddsOnlyTwo from "./odds/oddsOnlyTwo";
import HomeLayout from "../layout/homeLayout";
import { BetSlip } from "./bet/BetSlip";
import { colorHex } from "../../utils/constants";
import { userServices } from "../../utils/api/user/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { eventServices } from "../../utils/api/event/services";
import Loading from "../layout/loading";
import CustomizedDialog2 from "../common/Dailog2";
import { GameHeader } from "./styledComponents";
import Bookmaker from "./odds/bookmaker";
import { sportsTabList } from "../home/sportsTabList";
import PnlModal from "./pnlModal";
import {
  BetDetailsInterface,
  BetsInterface,
  FancyOddsInterface,
  FancyPnl,
  Pnl,
  PnlObj,
  ProfitObjectInterface,
  WinnerPnl,
} from "./types";
import { createProfits, transformMatchOdds } from "./eventUtils";
import moment from "moment";
import Marquee from "react-fast-marquee";
import { socket } from "../../utils/socket/socket";
import LiveScoreTv from "./liveScoreTv";
import MyBetWrapper from "./bet/MyBetWrapper";

const anish_socket_actve = false;
const ankit_socket_actve = false;

export const dharmParivartan = (str: string | number) => {
  if (["string", "number"].includes(typeof str)) {
    return str
      ?.toString()
      ?.split("")
      .reverse()
      .join("")
      .replace("00000", "L")
      .replace("000", "K")
      ?.split("")
      .reverse()
      .join("");
  }
  return str;
};

const Event = () => {
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
  const [fancyOddsSlower, setFancyOddsSlower] = useState<any>({});
  const [pnl, setPnl] = useState<Pnl[] | null>(null);
  const [winnerPnl, setWinnerPnl] = useState<PnlObj[] | null>(null);
  const [fancyPnl, setFancyPnl] = useState<FancyPnl[] | null>(null);
  const [prevFancyOdds, setPrevFancyOdds] = useState<any>();
  const [selectedPnlMarketId, setSelectedPnlMarketId] = useState("");
  const [oddSocketConnected, setOddSocketConnected] = useState(false);
  const [bets, setBets] = useState<BetsInterface | null>(null);

  const [profits, setProfits] = useState<ProfitObjectInterface>({
    Odds: {},
    Bookmaker: [],
    Fancy: [],
  });
  const nav = useNavigate();

  // const oddFromSocket = (response: any) => {
  //   console.log(response, "socket");
  //   Object.keys(response).forEach((element) => {
  //     if (
  //       ![
  //         "Fancy2",
  //         "Fancy3",
  //         "Odds",
  //         "Bookmaker",
  //         "OddEven",
  //         "BallByBall",
  //       ].includes(element)
  //     )
  //       response[element] = [];
  //     else {
  //       response[element] = response[element].map(
  //         (single: any, index: number) => ({
  //           ...(fancyOddsSlower[element]
  //             ? fancyOddsSlower[element][index] || {}
  //             : {}),
  //           ...single,
  //         })
  //       );
  //     }
  //   });
  //   setFancyOdds((fancyOdds: any) => {
  //     const Odds = transformMatchOdds(response.Odds);
  //     if (fancyOdds) {
  //       const newFancy = { ...fancyOdds };
  //       setPrevFancyOdds(newFancy);
  //     } else {
  //       setPrevFancyOdds({ ...response, Odds });
  //     }
  //     return { ...response, Odds };
  //   });
  // };

  //socket
  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const oddFromSocketSlower = (response: any) => {
    if (response) {
      setFancyOddsSlower(response);
    }
  };
  const eventId = searchParams.get("match-id");

  useEffect(() => {
    socket.on("OddsUpdated", oddFromSocketSlower);
    socket.on("JoinedSuccessfully", () => {
      setOddSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    let timer = setInterval(
      () =>
        !oddSocketConnected &&
        socket.emit("JoinRoom", {
          eventId,
        }),
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, [oddSocketConnected]);

  useEffect(() => {
    oddSocketConnected && setOddSocketConnected(false);
  }, [matchId]);
  //socket

  const getBets = async () => {
    if (ankit_socket_actve) return;

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

  // useEffect(() => {
  //   const getActiveFancyOdds = async () => {
  //     if (anish_socket_actve) return;
  //     if (matchId) {
  //       const { response } = await eventServices.newFancySlower(matchId || "");
  //       if (response) {
  //         setFancyOddsSlower(response);
  //       }
  //     }
  //   };
  //   getActiveFancyOdds();
  //   const timer = setInterval(() => getActiveFancyOdds(), 10000);
  //   return () => clearInterval(timer);
  // }, [matchId]);

  // const { lastMessage: oddsPnlLastMessage } = useWebSocket(
  //   `${
  //     import.meta.env.VITE_ANKIT_SOCKET_BET
  //   }/enduserodd/${matchId}/${localStorage.getItem("token")}`,
  //   { shouldReconnect: (event: CloseEvent) => true }
  // );

  // useEffect(() => {
  //   if (
  //     oddsPnlLastMessage?.data &&
  //     JSON.parse(oddsPnlLastMessage?.data)?.data &&
  //     ankit_socket_actve
  //   )
  //     setPnl(JSON.parse(oddsPnlLastMessage?.data).data);
  // }, [oddsPnlLastMessage]);

  // const { lastMessage: fancyPnlLastMessage } = useWebSocket(
  //   `${
  //     import.meta.env.VITE_ANKIT_SOCKET_BET
  //   }/enduserfancy/${matchId}/${localStorage.getItem("token")}`,
  //   { shouldReconnect: (event: CloseEvent) => true }
  // );

  // useEffect(() => {
  //   if (
  //     fancyPnlLastMessage?.data &&
  //     JSON.parse(fancyPnlLastMessage?.data)?.data &&
  //     ankit_socket_actve
  //   )
  //     setFancyPnl(JSON.parse(fancyPnlLastMessage?.data).data);
  // }, [fancyPnlLastMessage]);

  const getOdds = async () => {
    if (anish_socket_actve) return;
    if (matchId) {
      const { response } = await eventServices.newFancy(matchId);

      //showing only part of the data currently
      Object.keys(response).forEach((element) => {
        if (
          ![
            "Fancy2",
            "Fancy3",
            "Odds",
            "Bookmaker",
            "OddEven",
            "BallByBall",
          ].includes(element)
        )
          response[element] = [];
        else {
          response[element] = response[element].map(
            (
              single: FancyOddsInterface & { marketId: string },
              index: number
            ) => ({
              ...(fancyOddsSlower[element]
                ? fancyOddsSlower[element].find(
                  (odd: FancyOddsInterface & { marketId: string }) =>
                    odd.sid
                      ? odd.sid === single.sid
                      : odd.marketId
                        ? odd.marketId === single.marketId
                        : false
                ) || {}
                : {}),
              ...single,
            })
          );
        }
      });

      const Odds = transformMatchOdds(response.Odds);
      if (fancyOdds) {
        const newFancy = { ...fancyOdds };
        setPrevFancyOdds(newFancy);
      } else {
        setPrevFancyOdds({ ...response, Odds });
      }
      setFancyOdds({ ...response, Odds });
    }
  };

  const getPnl = async () => {
    if (!matchId || ankit_socket_actve) return;
    if (fancyOdds?.Odds?.[0]?.Name.toLowerCase().includes("winner")) {
      const { response } = await userServices.winnerPnlByMatch(
        fancyOdds?.Odds?.[0]?.marketId
      );
      if (response?.data?.length) {
        setWinnerPnl(
          response.data.map((pnlsOdds: WinnerPnl) => ({
            pnl: pnlsOdds.liability,
            selectionId: pnlsOdds.selctionId,
          }))
        );
      }
    } else {
      const { response } = await userServices.pnlByMatch(matchId);
      if (response?.data?.length) {
        setPnl(response.data);
      }
    }
  };

  const getFancyPnl = async () => {
    if (!matchId || ankit_socket_actve) return;
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
  useEffect(() => {
    fancyOdds && getPnl();
  }, [fancyOdds?.Odds?.[0]?.marketId]);

  // odds polling 0.5 sec
  useEffect(() => {
    const timer = setInterval(() => getOdds(), 500);
    return () => clearInterval(timer);
  }, [matchId, fancyOdds]);

  //pnl polling 5 sec
  useEffect(() => {
    const timer =
      fancyOdds &&
      setInterval(() => {
        getPnl();
        getFancyPnl();
        getBets();
      }, 5000);
    return () => clearInterval(timer);
  }, [matchId, fancyOdds?.Odds?.[0]?.marketId]);

  useEffect(() => {
    getOdds();
  }, []);

  //creating profits
  useEffect(() => {
    createProfits({
      fancyOdds,
      fancyPnl,
      betDetails,
      rechange: true,
      pnl,
      setProfits,
      winnerPnl,
    });
  }, [betDetails?.marketId]);

  useEffect(() => {
    createProfits({
      fancyOdds,
      fancyPnl,
      betDetails,
      pnl,
      setProfits,
      winnerPnl,
    });
  }, [
    betDetails?.stake,
    pnl,
    fancyPnl,
    winnerPnl,
    fancyOdds?.Odds[0]?.marketId,
  ]);

  const currentMatch: { date: string; matchName: string; matchId: string } =
    useMemo(
      () =>
        activeEventList
          ?.reduce((acc: any[], current) => [...acc, ...current.matchList], [])
          ?.find((item: any) => item.matchId == matchId),
      [activeEventList]
    );

  const matchOddMapCallback = useCallback(
    (singleOdd: any, index1: any) => {
      if (
        Boolean(prevFancyOdds?.Odds[index1]) &&
        singleOdd.runners?.length > 0
      ) {
        return (
          <>
            <CustomizedAccordions
              key={"match_odd" + index1}
              title={
                <Box flex={1} display="flex" justifyContent={"space-between"}>
                  <Typography
                    fontSize={{ xs: "0.75rem", lg: "0.85rem" }}
                    lineHeight={1}
                    fontWeight={500}
                  >
                    {singleOdd.Name}
                  </Typography>
                  <MinMaxDelayTypography display={{ lg: "none" }}>
                    Max: {dharmParivartan(singleOdd.maxBet)}
                    {`  Min`}:{dharmParivartan(singleOdd.minBet)}
                    {`  Bet Delay`}: {singleOdd.betDelay}
                  </MinMaxDelayTypography>
                </Box>
              }
            >
              <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
                <OddsNumberTitle showBetDelay={true} singleOdd={singleOdd} />
                {singleOdd?.runners.map((selection: any, index: string) => (
                  <Odds
                    details={singleOdd}
                    suspended={singleOdd?.status !== "OPEN"}
                    prevValues={prevFancyOdds.Odds[index1]?.runners[index]}
                    values={selection}
                    profits={profits.Odds[singleOdd?.marketId]?.find(
                      (profit) => profit.sid == selection.selectionId
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
            {singleOdd.display_message && (
              <Marquee speed={50} gradient={false}>
                <Typography fontSize="0.7rem" color="error.main">
                  {singleOdd.display_message}
                </Typography>
              </Marquee>
            )}
          </>
        );
      } else {
        return "";
      }
    },
    [prevFancyOdds, profits]
  );

  const bookmakerMapCallback = useCallback(
    (BookmakerOdds: FancyOddsInterface[], type: "toss" | undefined) => {
      return (
        <>
          <CustomizedAccordions
            title={
              <Box flex={1} display="flex" justifyContent={"space-between"}>
                <Typography
                  lineHeight={1}
                  fontSize={{ xs: "0.75rem", lg: "0.85rem" }}
                  fontWeight={500}
                >
                  {type ? "Toss" : "Bookmaker"}
                </Typography>
                <MinMaxDelayTypography display={{ lg: "none" }}>
                  Max: {dharmParivartan(BookmakerOdds[0].maxBet)}
                  {`   Min`}: {dharmParivartan(BookmakerOdds[0].minBet)}
                  {/* {`   Bet Delay`}: {BookmakerOdds[0].betDelay} */}
                </MinMaxDelayTypography>
              </Box>
            }
          >
            <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
              <OddsNumberTitle
                showBetDelay={false}
                singleOdd={BookmakerOdds[0]}
              />
              {BookmakerOdds?.map((odds: FancyOddsInterface, index) => (
                <Bookmaker
                  suspended={odds?.gstatus === "SUSPENDED"}
                  prevValues={
                    prevFancyOdds["Bookmaker"].filter(
                      (odds: any) => odds.t === BookmakerOdds[0].t
                    )[index]
                  }
                  values={odds}
                  profits={profits.Bookmaker?.find(
                    (profit) => profit?.sid === odds.sid
                  )}
                  marketName={"Bookmaker"}
                  setBetId={setBetDetails}
                />
              ))}
            </Box>
          </CustomizedAccordions>
          {BookmakerOdds[0]?.display_message && (
            <Marquee speed={50} gradient={false}>
              <Typography fontSize="0.7rem" color="error.main">
                {BookmakerOdds[0]?.display_message}
              </Typography>
            </Marquee>
          )}
        </>
      );
    },
    [prevFancyOdds, profits]
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
            {matches && <MyBetWrapper bets={bets} />}
          </Box>
        }
      >
        {fancyOdds?.Odds[0] && (
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
              {fancyOdds?.Odds && fancyOdds?.Odds[0]?.Series
                ? `${fancyOdds?.Odds[0]?.Series} > `
                : ""}
              {currentMatch?.matchName}
            </Typography>

            <Typography
              fontWeight={500}
              fontSize={{ xs: "0.6rem", lg: "0.9rem" }}
            >
              {fancyOdds?.Odds && fancyOdds?.Odds[0]?.eventTime}
            </Typography>
          </GameHeader>
        )}
        {!matches && <MyBetWrapper bets={bets} />}
        <LiveScoreTv
          lastMatchedTime={
            fancyOdds?.Odds &&
            fancyOdds?.Odds[0] &&
            moment(fancyOdds?.Odds[0]?.lastMatchTime).format(
              "DD/MM/YYYY hh:mm:ss"
            )
          }
        />
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
            {/* Match Odds Section */}
            {fancyOdds.Odds?.filter((i: any) => i.Name === "Match Odds").map(
              matchOddMapCallback
            )}

            {/* Bookmaker Section */}

            {fancyOdds["Bookmaker"].find(
              (i: FancyOddsInterface) => i.t !== "TOSS"
            ) &&
              bookmakerMapCallback(
                fancyOdds.Bookmaker.filter(
                  (odd: FancyOddsInterface) => odd.t !== "TOSS"
                ),
                undefined
              )}
        {/* Toss and Tied Section */}

        {fancyOdds.Odds?.filter(
          (i: any) => !["Match Odds"].includes(i.Name)
        ).map(matchOddMapCallback)}

        {fancyOdds["Bookmaker"] &&
          fancyOdds.Bookmaker.find(
            (odd: FancyOddsInterface) => odd.t === "TOSS"
          ) &&
          bookmakerMapCallback(
            fancyOdds.Bookmaker.filter(
              (odd: FancyOddsInterface) => odd.t === "TOSS"
            ),
            "toss"
          )}




        {/* Fancy Section */}
        {/* accordians for fancy with values */}
        {Object.keys(fancyOdds).map((fancyMarket: any) => {
          if (["Odds", "Bookmaker"].includes(fancyMarket)) return <></>;
          if (fancyOdds[fancyMarket]?.length > 0)
            return (
              <CustomizedAccordions
                title={
                  <Box flex={1} display="flex" justifyContent={"space-between"}>
                    <Typography
                      fontSize={{ xs: "0.75rem", lg: "0.85rem" }}
                      lineHeight={1}
                      fontWeight={500}
                    >
                      {fancyMarket}
                    </Typography>
                    {/* <MinMaxDelayTypography>
                      Bet Delay: {fancyOdds[fancyMarket][0].betDelay}
                    </MinMaxDelayTypography> */}
                  </Box>
                }
              >
                <Grid
                  container
                  pb={{ xs: 1 }}
                  px={{ xs: 1.5 }}
                  gap={{ md: "3%" }}
                >
                  <OddsNumberTitleTwo inverted={fancyMarket === "Fancy3"} />
                  <OddsNumberTitleTwo inverted={fancyMarket === "Fancy3"} />

                  {fancyOdds[fancyMarket].map(
                    (odds: FancyOddsInterface, index: number) => {
                      return (
                        <OddsOnlyTwo
                          odds={odds}
                          setMarketId={setSelectedPnlMarketId}
                          profit={profits.Fancy.find(
                            (pnl) => pnl.sid === odds.sid
                          )}
                          inverted={fancyMarket === "Fancy3"}
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

const MinMaxDelayTypography = styled(Typography)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: 700,
  // fontSize: { xs: "0.75rem", lg: "0.85rem" },
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.75rem",
  },
}));