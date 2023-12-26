import React, { useState } from "react";
import Item from "../item/Item";
import TopNav from "../navBar/TopNav";
import BannerList from "../BannerSection/BannerList";
import FooterForMob from "../FooterForMob/FooterForMob";

function Home(props) {


const [gameIdForItemPage, setGameIdForItemPage]=useState(4);

const gameId =(id)=>{
  setGameIdForItemPage(id)
  // props.idddd(id)
}


  return (
    <div>
      <div  className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      {
      
        localStorage.getItem("token") !== null?"":<BannerList/>
      }

        <Item casinoAllow={props.casinoAllow} gameIdForItemPage={gameIdForItemPage}/>
    </div>
  );
}

export default Home;
