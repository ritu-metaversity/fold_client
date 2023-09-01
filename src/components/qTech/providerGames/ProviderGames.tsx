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

  const getGameLists = async (token: string) => {
    const { response } = await qTechServices.gameLists({
      token,
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

  const authenticationHandler = async () => {
    const { response } = await qTechServices.authentication();

    if (!!response && response?.data && response?.data?.access_token) {
      const { access_token } = response?.data;

      window.localStorage.setItem("qtech_access_token", access_token);
      await getGameLists(access_token);
    }
  };

  useEffect(() => {
    if (!!params && params?.name) {
      const name = params.name;
      if (name === PROVIDERS_NAME.Q_TECH_GAMES) {
        authenticationHandler();
      }
    }
  }, []);

  return (
    <Fragment>
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <div className={"mid_container"}>
        <div className={classes["card_container"]}>
          {!GameLists ? <Loading /> : null}
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
