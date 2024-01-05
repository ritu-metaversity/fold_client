import React, { useEffect, useState } from "react";
import { FgameData } from "../desktopLayout/fantasyGame/FantsyGameProvider";
import { useNavigate } from "react-router-dom";
import { CasinoApi } from "../apis/CasinoApi";

const FantasyGamesHome = ({ path }) => {
  const nav = useNavigate();
  const handelFantsy = (id, val) => {
    nav(path, { state: { id: id, gameId: val } });
  };

  const [providerList, setProviderList] = useState({});
  useEffect(() => {
    CasinoApi.ProvideList({
      gameType: "ALL",
    }).then((res) => {
      setProviderList(res?.data?.data);
    });
  }, []);
  return (
    <div>
      <h4 className="casino_name">{"Fantasy Games".toUpperCase()}</h4>

      <div className="live_casino_home">
        

        {localStorage.getItem("token") === null? FgameData?.map((ele, id) => {
          return (
            <div
              key={id}
              onClick={() => handelFantsy(id, ele?.filterType)}
              className="sub_live_casino">
              <img
                className="live_casino_logo"
                src={ele?.logo}
                alt=""
              />
              <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                {ele?.name }
              </p>
            </div>
          );
        }):FgameData?.map((ele) =>
          Object?.values(providerList)
            ?.reduce((a, c) => [...a, ...c], [])
            .find((item1) => ele.filterType == item1?.providerId)
        )?.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => handelFantsy(id, item?.filterType)}
              className="sub_live_casino">
              <img
                className="live_casino_logo"
                src={item?.image || "placeholder-image-url"}
                alt=""
              />
              <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                {item?.providerName }
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FantasyGamesHome;
