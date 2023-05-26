import React, { useState } from "react";
import TopNav from "../navBar/TopNav";
import Sport from "./Sport";
import BannerList from "../BannerSection/BannerList";
import FooterForMob from "../FooterForMob/FooterForMob";

const SportData = (props) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    // props.idddd(id);

  };
  return (
    <>
      <div className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      {
        localStorage.getItem("token") !== null ?"":<BannerList/>
      }
      
      <Sport gameIdForItemPage={gameIdForItemPage} />
    </>
  );
};

export default SportData;
