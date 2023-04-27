import React, { useState } from "react";
import TopNav from "../navBar/TopNav";
import Sport from "./Sport";

const SportData = (props) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    props.idddd(id);
  };


  console.log(gameIdForItemPage, "sadsaf")

  return (
    <>
      <div className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      <Sport gameIdForItemPage={gameIdForItemPage} />
    </>
  );
};

export default SportData;
