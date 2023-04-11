import React, { useState } from "react";
import Item from "../item/Item";
import Mobilenav from "../navBar/MobileNav/Mobilenav";
// import NavBar from "../navBar/NavBar";
import TopNav from "../navBar/TopNav";
import NavBar from "../navBar/NavBar";

function Home(props) {


const [gameIdForItemPage, setGameIdForItemPage]=useState("");

const gameId =(id)=>{
  setGameIdForItemPage(id)
  props.idddd(id)
}

  return (
    <div>
      <div  className="wrapper">
        <NavBar/>
        <Mobilenav/>
        <TopNav gameId={gameId} />
        <Item gameIdForItemPage={gameIdForItemPage}/>
      </div>
    </div>
  );
}

export default Home;
