import React, { useEffect, useState } from "react";
import MyBet from "./MyBet";
import useWebSocket from "react-use-websocket";
import MybetMobile from "./MybetMobile";
import { BetsInterface } from "../types";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const MyBetWrapper = () => {
  const [bets, setBets] = useState<BetsInterface | null>(null);
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("match-id");

  const { lastMessage } = useWebSocket(
    `${
      process.env.REACT_APP_ANKIT_SOCKET_BET
    }/chat/${matchId}/${localStorage.getItem("token")}`,
    { shouldReconnect: (event: CloseEvent) => true }
  );
  const matches = useMediaQuery("(min-width : 1280px)");

  useEffect(() => {
    console.log(lastMessage, "ankit2");
    if (lastMessage?.data && JSON.parse(lastMessage?.data)?.data)
      setBets(JSON.parse(lastMessage?.data).data);
  }, [lastMessage]);

  return (
    <>
      {matches
        ? bets && <MyBet bets={bets} />
        : bets && <MybetMobile bets={bets}></MybetMobile>}
    </>
  );
  //   return <MyBet />;
};

export default MyBetWrapper;
