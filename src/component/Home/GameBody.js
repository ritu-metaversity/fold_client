import React from "react";
// import Footer from "../footer/Footer";
import Item from "../item/Item";
import Mobilenav from "../navBar/MobileNav/Mobilenav";
import NavBar from "../navBar/NavBar";
import TopNav from "../navBar/TopNav";
// import NewLunch from "../NewLunch";
// import SideBar from "../sidebar/SideBar";

function GameBody() {


  return (
    <div>
      <div className="wrapper">
        <TopNav />
        <Item />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default GameBody();
