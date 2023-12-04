import React from "react";
import { FgameData } from "../desktopLayout/fantasyGame/FantsyGameProvider";
import { useNavigate } from "react-router-dom";

const FantasyGamesHome = ({path}) => {
    const nav = useNavigate();
    const handelFantsy = (id,val)=>{
        nav(path, { state: { id:id, gameId:val } })
    }
  return (
    <div>
      <h4 className="casino_name">Fantasy Games</h4>

      <div className="live_casino_home">
        {FgameData.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => handelFantsy(id, item?.filterType)}
              className="sub_live_casino">
              <img
                className="live_casino_logo"
                src={item?.logo}
              />
              <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                {item?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FantasyGamesHome;
