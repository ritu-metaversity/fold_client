import { Fragment, useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import { useParams } from "react-router-dom";
import { PROVIDERS_NAME } from "../../../utils/helper";
import Loading from "../../layout/loading";
import classes from "./ProviderGames.module.css";
import { GameListInterface } from ".";
import GamePortal from "../gamePortal/GamePortal";

function ProviderGames() {
  const [GameLists, setGameLists] = useState<GameListInterface[]>([]);
  const params = useParams();
  const [ShowPortal, setShowPortal] = useState<boolean>(false);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);

  const getGameLists = async (token: string, provider?: string) => {
    const { response } = await qTechServices.gameLists({
      token,
      provider,
    });

    if (
      !!response &&
      !!response?.data &&
      !!response?.data?.items &&
      response?.data?.items.length
    ) {
      const { items } = response?.data;
      setGameLists(items);
    }
  };

  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  function getKeyByValue<T extends object>(object: T, value: string) {
    return Object.keys(object).find(
      (key) => object[key as keyof object] === value
    );
  }

  const authenticationHandler = async () => {
    const access_token = window.localStorage.getItem("qtech_access_token");
    const name = params.name!;
    const key = getKeyByValue(PROVIDERS_NAME, name);

    if (access_token) {
      if (key) {
        const providerGameName = PROVIDERS_NAME[key + "_GAMES_PROVIDER"];
        await getGameLists(access_token, providerGameName);
      } else {
        if (name === PROVIDERS_NAME.Q_TECH_GAMES) {
          await getGameLists(access_token);
        }
      }
    }
    // }
  };

  useEffect(() => {
    if (!!params && params?.name) {
      authenticationHandler();
    }
  }, []);

  return (
    <Fragment>
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <div className={"mid_container"}>
        <div className={classes["card_container"]}>
          {!GameLists.length ? <Loading /> : null}
          <div className={classes["grid_container"]}>
            {!!GameLists && GameLists.length
              ? GameLists.map((elm) => (
                  <div
                    key={elm?.id}
                    className={classes["card"]}
                    onClick={() => {
                      setSelectedGame(elm?.id);
                      showAndHideHandler();
                    }}
                  >
                    <div
                      className={classes["card_content"]}
                      style={{
                        backgroundImage: `url(${elm?.images[1]?.url})`,
                      }}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProviderGames;
