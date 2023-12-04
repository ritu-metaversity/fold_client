import React from "react";
import SuperNowa from "../desktopLayout/IndianCasino/SuperNowa";
import { useNavigate } from "react-router-dom";

const SuperNowaHome = ({path}) => {
    const nav = useNavigate();
    const handelFantsy = ()=>{
        nav(path)
    }
  return (
    <div>
      <h4 className="casino_name">Super Nowa</h4>

      <div className="live_casino_home">
        <div onClick={handelFantsy}  className="sub_live_casino">
          <img className="live_casino_logo" src="https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png" />
          <p style={{ fontWeight: "900", paddingTop: "2px" }}>Super Nowa</p>
        </div>
      </div>
    </div>
  );
};

export default SuperNowaHome;
