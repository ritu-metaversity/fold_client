import "./AllProviderName.css";
import { useNavigate } from "react-router";
import { AllCasinoProviderName, ProviderObject, key } from "./AllProviderConst";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { qTechServices } from "../../utils/api/qTechGames/services";

export interface ProviderListFromApiInterface {
  id: number;
  gameType: string;
  providerName: string;
  currency: string;
  providerId: string;
  image: string;
}
export interface ProviderListFromApi {
  [x: string]: ProviderListFromApiInterface[];
}
const Heading = {
  slot: "Slot Games",
  lottery: "Lottery",
  instantWin: "Instant Win",
  liveCasino: "International Casino",
};
const AllProviderName = () => {
  let navigate = useNavigate();
  const { isSignedIn, setModal, allocatedCasino } = useContext(UserContext);

  const [providerListFromApi, setProviderListFromApi] = useState<string[]>([]);
  const [providerListFromApiRaw, setProviderListFromApiRaw] =
    useState<ProviderListFromApi>({});
  const getProviderListFromApi = async () => {
    if (!isSignedIn) return;
    const { response } = await qTechServices.providerLists("all");
    if (response?.data) {
      setProviderListFromApiRaw(response.data);
      setProviderListFromApi(Object.keys(response.data));
    }
  };
  useEffect(() => {
    getProviderListFromApi();
  }, [isSignedIn]);
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
  // const handleGamePagerouteApi = (providerItem:ProviderListFromApiInterface , key: key) => {
  //   if (isSignedIn)
  //     navigate(providerItem.PageUrl, {
  //       state: {
  //         filterType: providerItem?.gameCode,
  //         filter: providerItem.filter,
  //         gameCode: providerItem.gameCodeName,
  //       },
  //     });
  //   else setModal && setModal({ login: true });
  // };
  return (
    <div className="Main_header_for_game_provide_Incasino">
      {Object.keys(AllCasinoProviderName).map((key, item) =>
        isSignedIn &&
        !allocatedCasino["QTech"]?.active &&
        key !== "Indian Casino" ? (
          <></>
        ) : (!(
            allocatedCasino.Aura?.active ||
            allocatedCasino["Super Nova"]?.active
          ) &&
            key === "Indian Casino" &&
            isSignedIn) ||
          (isSignedIn &&
            ["Slot Games", "Lottery", "Internation Casino"].includes(key)) ? (
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
                    (!isSignedIn ||
                      (item.gameCode === "AURA" &&
                        allocatedCasino.Aura?.active) ||
                      (item.gameCode === "NOWA" &&
                        allocatedCasino["Super Nova"]?.active) ||
                      (!["AURA", "NOWA"].includes(item.gameCode) &&
                        allocatedCasino["QTech"]?.active &&
                        providerListFromApiRaw &&
                        !!Object.values(providerListFromApiRaw)
                          .reduce((A, C) => [...A, ...C], [])
                          .find((j) => j.providerId === item.gameCode))) && (
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
      {providerListFromApi.map(
        (key) =>
          isSignedIn &&
          allocatedCasino["QTech"]?.active && (
            <div className="Inner_header_for_game_provide_Incasin">
              <h3 className="provider_name_details">
                {Heading[key as keyof typeof Heading]}
              </h3>
              <div className="main_wrap_live-casion">
                {providerListFromApiRaw &&
                  providerListFromApiRaw[
                    key as keyof typeof providerListFromApiRaw
                  ].map((item, index) => (
                    <div
                      className="MainBtn_warp"
                      style={{ border: "0.5px solid" }}
                      onClick={() =>
                        handleGamePageroute(
                          {
                            name: "TURBO",
                            logo: "https://turbogames.io/images/home/home-logo.png",
                            gameCode: item.providerId,
                            PageUrl: "/" + key,
                            filter: key.toUpperCase(),
                          },
                          key as key
                        )
                      }
                    >
                      <img
                        className="complany-logo-warp"
                        src={item?.image}
                        alt=""
                      />
                      <span className="complany-name-wrap">
                        {item?.providerName}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AllProviderName;
