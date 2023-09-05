import { useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import ProvidersTabs from "../providersTabs/providersTabs";
import classes from "./providerTabsWithGames.module.css";
import { GameListInterface } from "../providerGames";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import GamePortal from "../gamePortal/GamePortal";
import { data } from "./providers.data";

function ProviderTabsWithGames() {
  const [GameLists, setGameLists] = useState<GameListInterface[]>([]);
  const [SelectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [ShowPortal, setShowPortal] = useState<boolean>(false);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);
  const urlPathName = window.location.pathname.split("/")[1];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Category, setCategory] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [filterGamesList, setFilterGamesList] = useState<GameListInterface[]>(
    []
  );

  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  const getGameLists = async (token: string, provider?: string) => {
    const { response } = await qTechServices.gameLists({
      token,
      provider: SelectedProvider || "",
      gameCategory:
        urlPathName === "slot" ? urlPathName.toUpperCase() : "LIVECASINO",
    });
    setIsLoading(false);

    if (
      !!response &&
      !!response?.data &&
      !!response?.data?.items &&
      response?.data?.items.length
    ) {
      const { items } = response?.data;
      let categories = items.map((el: any) => {
        const itemAr = el?.category.split("/");
        const lastelm = itemAr[itemAr.length - 1];
        return lastelm;
      });
      const uniqueArrayValues: string[] = Array.from(new Set(categories));
      if (!!uniqueArrayValues && !!uniqueArrayValues.length) {
        uniqueArrayValues.unshift("All");
        setCategory(uniqueArrayValues);
      }
      setGameLists(items);
    }
  };

  const authenticationHandler = async () => {
    setIsLoading(true);
    const { response } = await qTechServices.authentication();
    if (!!response && response?.data && response?.data?.access_token) {
      const { access_token } = response?.data;
      window.localStorage.setItem("qtech_access_token", access_token);

      await getGameLists(access_token);
    }
  };

  const filterHandler = function (value: string) {
    setFilterValue(value);
    let filterGameLists: GameListInterface[] = [];
    setFilterGamesList([]);

    if (value === "All") {
      setFilterGamesList([]);
    } else {
      for (let i = 0; i < GameLists.length; i++) {
        const category = GameLists[i]?.category;
        const categoryAr = category.split("/");
        const lastElm = categoryAr[categoryAr.length - 1];
        if (lastElm === value) {
          filterGameLists.push(GameLists[i]);
        }
      }

      setFilterGamesList(filterGameLists);
    }
  };

  const getProviderValue = function (value: string) {
    if (value !== SelectedProvider) {
      setGameLists([]);
      setFilterGamesList([]);
    }
    setSelectedProvider(value);
  };

  useEffect(() => {
    setGameLists([]);
    setCategory([]);
    authenticationHandler();
  }, [SelectedProvider, urlPathName]);

  return (
    <div className={classes["container"]}>
      {!!ShowPortal ? (
        <GamePortal gameName={SelectedGame || ""} close={showAndHideHandler} />
      ) : null}
      <ProvidersTabs
        providerList={data}
        getName={getProviderValue}
        value={SelectedProvider || ""}
      />
      {!!Category && Category?.length ? (
        <div className={classes["category_filter_div"]}>
          {Category.map((el) => (
            <div
              onClick={() => filterHandler(el)}
              className={classes["wrapper"]}
            >
              <div
                key={el}
                className={`${classes["cr"]} ${
                  classes[el === filterValue ? "active" : "unactive"]
                } `}
              >
                <p>{el}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {isLoading && (
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
        {(!!filterGamesList && filterGamesList?.length) ||
        (!!GameLists && GameLists.length)
          ? (!!filterGamesList && filterGamesList?.length
              ? filterGamesList
              : GameLists
            ).map((el) => (
              <div
                onClick={() => {
                  setSelectedGame(el?.id);
                  showAndHideHandler();
                }}
                key={el?.id}
                className={classes["games_card"]}
              >
                <img src={el?.images?.[1]?.url} alt={el?.name} />
              </div>
            ))
          : null}
      </div>
      {!isLoading && !GameLists.length && (
        <p className={classes["cnt"]}>No Games found</p>
      )}
    </div>
  );
}

export default ProviderTabsWithGames;
