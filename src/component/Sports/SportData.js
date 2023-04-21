import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import TopNav from "../navBar/TopNav";
import Mobilenav from "../navBar/MobileNav/Mobilenav";
import Sport from "./Sport";

const SportData = (props) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    props.idddd(id);
  };

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
