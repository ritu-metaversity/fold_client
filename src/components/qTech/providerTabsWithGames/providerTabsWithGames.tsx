import { useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import ProvidersTabs from "../providersTabs/providersTabs";
import classes from "./providerTabsWithGames.module.css";
import { GameListInterface } from "../providerGames";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import GamePortal from "../gamePortal/GamePortal";

function ProviderTabsWithGames() {
  const [GameLists, setGameLists] = useState<GameListInterface[]>([]);
  const [SelectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [ShowPortal, setShowPortal] = useState<boolean>(false);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);

  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  const getGameLists = async (token: string, provider?: string) => {
    const { response } = await qTechServices.gameLists({
      token,
      provider: SelectedProvider || "",
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

  const authenticationHandler = async () => {
    const { response } = await qTechServices.authentication();

    if (!!response && response?.data && response?.data?.access_token) {
      const { access_token } = response?.data;
      window.localStorage.setItem("qtech_access_token", access_token);

      console.log(access_token);

      await getGameLists(access_token);
    }
  };

  const getProviderValue = function (value: string) {
    if (value !== SelectedProvider) {
      setGameLists([]);
    }
    setSelectedProvider(value);
  };

  useEffect(() => {
    authenticationHandler();
  }, [SelectedProvider]);

  return (
    <div className={classes["container"]}>
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <ProvidersTabs getName={getProviderValue} />
      {!GameLists.length && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className={classes["games_container"]}>
        {!!GameLists && GameLists.length
          ? GameLists.map((el) => (
              <div
                onClick={() => {
                  setSelectedGame(el?.id);
                  showAndHideHandler();
                }}
                key={el?.id}
                className={classes["games_card"]}
              >
                <img src={el?.images[1]?.url} alt={el?.name} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default ProviderTabsWithGames;
