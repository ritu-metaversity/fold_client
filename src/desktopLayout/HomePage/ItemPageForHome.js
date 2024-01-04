import { React, useEffect, useState } from "react";
import NewLunch from "../Newlunch/NewLunch";
import DeskMainPage from "../itemPageforDesktop/DeskMainPage";
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
import SuperNowaHome from "../../CasinoHome/SuperNowaHome";
import Slot from "../../component/Items/Slot/Slot";
import { CasinoApi } from "../../apis/CasinoApi";

function ItemPageForHome({ casinoAllow }) {
  const [providerList, setProviderList] = useState({})
  useEffect(()=>{
    CasinoApi.ProvideList({
      gameType:"ALL"
    }).then((res)=>{
      setProviderList(res?.data?.data)
      console.log(res?.data?.data, "asdasdasdasd")
    })

  }, [])
  return (
    <div className="main">
      <div className="container-fluid container-fluid-5">
        <div className="row itemHome">
          <DeskMainPage />
          {(casinoAllow?.Aura || localStorage.getItem("token") === null) && <NewLunch />}
          {(casinoAllow?.Nowa || localStorage.getItem("token") === null) && <SuperNowaHome path={"/supernowa"} />}
          {(casinoAllow?.Qtech || localStorage.getItem("token") === null) && (
            <>
              <LiveCasinoHome providerList={providerList?.liveCasino}/>
              <FantasyGamesHome path={"/fantsy"} />
              <SlotHome providerList={providerList} />
            </>
          )}
          {
           localStorage.getItem("token") === null && <LotteryHome path={"/lottery"} />
          }

          {/* <LiveCasino liveCasino={"LIVECASINO"} showid={1}/> */}
        </div>
      </div>
    </div>
  );
}

export default ItemPageForHome;
