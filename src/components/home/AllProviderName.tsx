import "./AllProviderName.css";
import { useNavigate } from "react-router";
import { AllCasinoProviderName, ProviderObject, key } from "./AllProviderConst";
import { useContext } from "react";
import { UserContext } from "../../App";

const AllProviderName = () => {
  let navigate = useNavigate();

  const { isSignedIn, setModal, appData } = useContext(UserContext);
  const handleGamePageroute = (providerItem: ProviderObject, key: key) => {
    if (isSignedIn)
      navigate(providerItem.PageUrl, {
        state: {
          filterType: providerItem?.gameCode,
          filter: providerItem.filter,
          gameCode: providerItem.gameCodeName,
        },
      });
    else setModal && setModal({ login: true });
  };
  return (
    <div className="Main_header_for_game_provide_Incasino">
      {Object.keys(AllCasinoProviderName).map((key, item) =>
        !appData?.qtech && key !== "Indian Casino" ? (
          <></>
        ) : !(appData?.aura || appData?.superNova) && key == "Indian Casino" ? (
          <></>
        ) : (
          <div className="Inner_header_for_game_provide_Incasin">
            <h3 className="provider_name_details">{key}</h3>
            <div className="main_wrap_live-casion">
              {AllCasinoProviderName &&
                AllCasinoProviderName[
                  key as keyof typeof AllCasinoProviderName
                ].map(
                  (item, index) =>
                    ((item.gameCode === "AURA" && appData?.aura) ||
                      (item.gameCode === "NOWA" && appData?.superNova) ||
                      (!["AURA", "NOWA"].includes(item.gameCode) &&
                        appData?.qtech)) && (
                      <div
                        className="MainBtn_warp"
                        style={{ border: "0.5px solid" }}
                        onClick={() => handleGamePageroute(item, key as key)}
                      >
                        <img
                          className="complany-logo-warp"
                          src={item?.logo}
                          alt=""
                        />
                        <span className="complany-name-wrap">{item?.name}</span>
                      </div>
                    )
                )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllProviderName;
