import { useEffect, useState } from "react";
import classes from "./fantasy.module.css";
import { data, gameData, GameDataInterface } from "./data";
import ProvidersTabs from "../providersTabs/providersTabs";
import GamePortal from "../gamePortal/GamePortal";
import { Toolbar, useMediaQuery } from "@mui/material";
import { ProviderListFromApi } from "../../home/AllProviderName";
import { qTechServices } from "../../../utils/api/qTechGames/services";

function Fantasy() {
  const [SelectedProvider, setSelectedProvider] = useState<string | null>(
    "SPB"
  );
  const [GameLists, setGameLists] = useState<GameDataInterface[]>([]);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);
  const [ShowPortal, setShowPortal] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 1210px)");
  const [providerListFromApi, setProviderListFromApi] = useState<string[]>([]);
  const getProviderListFromApi = async () => {
    const { response } = await qTechServices.providerLists("all");
    if (response?.data) {
      const newRes: ProviderListFromApi = { ...response.data };
      setProviderListFromApi(
        Object.values(newRes).reduce((a, b) => {
          const b2 = b.map((i) => i.providerId);
          return [...a, ...b2];
        }, [] as string[])
      );
    }
  };
  useEffect(() => {
    getProviderListFromApi();
  }, []);
  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  const getProviderValue = function (value: string) {
    if (value !== SelectedProvider) {
      setGameLists([]);
    }
    setSelectedProvider(value);
  };


  useEffect(() => {
    if (SelectedProvider) {
      const gamesAr = gameData.filter(
        (el) => el.providerId === SelectedProvider
      );
      setGameLists(gamesAr);
    }
  }, [SelectedProvider]);

  return (
    <div>
      {!!isMobile ? null : <Toolbar />}
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <div className={classes["gam_ls"]}>
        <div className={classes["tl"]}>
          <ProvidersTabs
            providerList={data.filter((i) =>
              providerListFromApi.includes(i.filterType)
            )}
            getName={getProviderValue}
            value={SelectedProvider || ""}
          />
        </div>
        <div className={classes["game_cr"]}>
          <div>
            <div className={classes["games_container"]}>
              {GameLists.map((el) => (
                <div
                  onClick={() => {
                    setSelectedGame(el?.id);
                    showAndHideHandler();
                  }}
                  key={el?.id}
                  className={classes["games_card"]}
                >
                  <img src={el?.image} alt={el?.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fantasy;
