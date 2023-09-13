import { useEffect, useState } from "react";
import classes from "./fantasy.module.css";
import { data, gameData, GameDataInterface } from "./data";
import ProvidersTabs from "../providersTabs/providersTabs";
import GamePortal from "../gamePortal/GamePortal";
import { qTechServices } from "../../../utils/api/qTechGames/services";

function Fantasy() {
  const [SelectedProvider, setSelectedProvider] = useState<string | null>(
    "SPB"
  );
  const [GameLists, setGameLists] = useState<GameDataInterface[]>([]);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);
  const [ShowPortal, setShowPortal] = useState<boolean>(false);

  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  const getProviderValue = function (value: string) {
    if (value !== SelectedProvider) {
      setGameLists([]);
    }
    setSelectedProvider(value);
  };

  const authenticationHandler = async () => {
    const { response } = await qTechServices.authentication();
    if (!!response && response?.data && response?.data?.access_token) {
      const { access_token } = response?.data;
      window.localStorage.setItem("qtech_access_token", access_token);
    }
  };

  useEffect(() => {
    authenticationHandler();
  }, []);

  useEffect(() => {
    if (SelectedProvider) {
      const gamesAr = gameData.filter(
        (el) => el.providerId === SelectedProvider
      );
      setGameLists(gamesAr);
    }
  }, [SelectedProvider]);

  return (
    <div className={"mid_container"}>
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <ProvidersTabs
        providerList={data}
        getName={getProviderValue}
        value={SelectedProvider || ""}
        cls={"provider"}
      />
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
  );
}

export default Fantasy;
