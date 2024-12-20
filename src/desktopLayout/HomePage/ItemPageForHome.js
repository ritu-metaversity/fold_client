import { React, useEffect, useState } from "react";
// import NewLunch from "../Newlunch/NewLunch";
import DeskMainPage from "../itemPageforDesktop/DeskMainPage";
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
// import SuperNowaHome from "../../CasinoHome/SuperNowaHome";
import Slot from "../../component/Items/Slot/Slot";
import { CasinoApi } from "../../apis/CasinoApi";
import LatestEvent from "../../common/LatestEvent";
import FantsyList from "../fantasyGame/FantsyList";

function ItemPageForHome({ casinoAllow }) {
  const [providerList, setProviderList] = useState({})
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token !== null){
      CasinoApi.ProvideList({
        gameType:"ALL"
      }).then((res)=>{
        setProviderList(res?.data?.data)
      })
    }
  }, [token])
  return (
    <div className="main">
      <div className="container-fluid container-fluid-5">
        <div className="row itemHome">
        {/* <LatestEvent iplPath="/gamedetail/28127348" elePath="/gamedetail/1706456690"/> */}

          <DeskMainPage />
          <FantsyList  showHome={true}/>
           <Slot />

          {/* {(casinoAllow?.Aura || token === null) && <NewLunch />}
          {(casinoAllow?.Nowa || token === null) && <SuperNowaHome path={"/supernowa"} />}
          {(casinoAllow?.Qtech || token === null) && (
            <>
              <LiveCasinoHome providerList={providerList?.liveCasino}/>
              <FantasyGamesHome path={"/fantsy"} />
              <SlotHome providerList={providerList} />
            </>
          )}
          {
           token === null && <LotteryHome path={"/lottery"} />
          }

          <LiveCasino liveCasino={"LIVECASINO"} showid={1}/> */}
        </div>
      </div>
    </div>
  );
}

export default ItemPageForHome;
