import React, { useState } from "react";
import Footer from "../footer/Footer";
import Item from "../item/Item";
import Mobilenav from "../navBar/MobileNav/Mobilenav";
import NavBar from "../navBar/NavBar";
import TopNav from "../navBar/TopNav";

function Home(urldtaa) {

const [activeSport, setActiveSport]=useState("");
const [sportId, setSportId]=useState("");

const [gameIdForItemPage, setGameIdForItemPage]=useState("");


const gameIdFor=(id)=>{
  setSportId(id)
}
const gameId =(id)=>{
  setGameIdForItemPage(id)
}

  return (
    <div>
      <NavBar sportDetail={activeSport} gameIdFor={gameIdFor}/>
      <div  className="wrapper">
        <Mobilenav/>
        <TopNav gameId={gameId}/>
        <Item gameIdForItemPage={gameIdForItemPage} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
