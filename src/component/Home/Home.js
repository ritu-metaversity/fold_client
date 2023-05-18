import React, { useState } from "react";
import Item from "../item/Item";
import TopNav from "../navBar/TopNav";

function Home(props) {


const [gameIdForItemPage, setGameIdForItemPage]=useState(4);

const gameId =(id)=>{
  setGameIdForItemPage(id)
  props.idddd(id)
}


  return (
    <div>
      <div  className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
        <Item gameIdForItemPage={gameIdForItemPage}/>
    </div>
  );
}

export default Home;
