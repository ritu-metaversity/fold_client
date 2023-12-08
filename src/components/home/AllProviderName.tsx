import "./AllProviderName.css";
import { useNavigate } from "react-router";
import { AllCasinoProviderName, ProviderObject, key } from "./AllProviderConst";

const AllProviderName = () => {
  let navigate = useNavigate();
  const handleGamePageroute = (providerItem: ProviderObject, key: key) => {
    navigate(providerItem.PageUrl, {
      state: {
        filterType: providerItem?.gameCode,
        filter: providerItem.filter,
        gameCode: providerItem.gameCodeName,
      },
    });
  };
  return (
    <div className="Main_header_for_game_provide_Incasino">
      {Object.keys(AllCasinoProviderName).map((key, item) => (
        <div className="Inner_header_for_game_provide_Incasin">
          <h3 className="provider_name_details">{key}</h3>
          <div className="main_wrap_live-casion">
            {AllCasinoProviderName &&
              AllCasinoProviderName[
                key as keyof typeof AllCasinoProviderName
              ].map((item, index) => (
                <div
                  className="MainBtn_warp"
                  style={{ border: "0.5px solid" }}
                  onClick={() => handleGamePageroute(item, key as key)}
                >
                  <img className="complany-logo-warp" src={item?.logo} alt="" />
                  <span className="complany-name-wrap">{item?.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProviderName;
