import { Fragment, useEffect, useState, useRef, useContext } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import ProvidersTabs from "../providersTabs/providersTabs";
import classes from "./providerTabsWithGames.module.css";
import { GameListInterface } from "../providerGames";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import GamePortal from "../gamePortal/GamePortal";
import {
  casinoProviderList,
  slotProviderList,
  lotteryprovidersList,
} from "./providers.data";
import axios from "axios";
import { StyledGameThumb } from "../../casino/styledComponent";
import { Typography } from "@mui/material";
import { colorHex } from "../../../utils/constants";
import CasinoGame from "../../casino/game/CasinoGame";
import { supernowaServices } from "../../../utils/api/supernowa/services";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../App";

export interface GameInterface {
  id: string;
  images: { url: string }[];
  name: string;
}

export interface CustomProviderGameInterface {
  gameCode: string;
  gameId: number;
  gameName: string;
  imageUrl: string;
  thumb?: string;
  code?: string;
  name?: string;
  providerCode?: string;
}

export interface SuperNowaGameInterface {
  name: string;
  code: string;
  thumb: string;
  providerName: string;
  providerCode: string;
}

function ProviderTabsWithGames({ filter }: { filter: string }) {
  const [GameLists, setGameLists] = useState<GameListInterface[]>([]);
  const [SelectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [ShowPortal, setShowPortal] = useState<boolean>(false);
  const [SelectedGame, setSelectedGame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Category, setCategory] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [filterGamesList, setFilterGamesList] = useState<GameListInterface[]>(
    []
  );
  const [CustomGameList, setCustomGameList] = useState<GameInterface[] | null>(
    null
  );
  const [customGameProvider, setCustomGameProvider] = useState<boolean>(false);
  const [customProviderGames, setCustomProviderGames] = useState<
    CustomProviderGameInterface[]
  >([]);
  const [open, setOpen] = useState<string | number>(0);
  const [gameLaunchURL, setGameLaunchURL] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const screenRef = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation();
  const showAndHideHandler = function () {
    setShowPortal(!ShowPortal);
  };

  const getGameLists = async (token: string, provider?: string) => {
    if (!allocatedCasino["QTech"]?.active) return;
    setIsLoading(true);
    const { response } = await qTechServices.gameLists({
      token,
      provider: SelectedProvider || "",
      gameCategory: filter.toUpperCase(),
    });
    setIsLoading(false);

    if (response?.data?.items?.length) {
      const { items } = response?.data;
      let categories = items.map((el: any) => {
        const itemAr = el?.category.split("/");
        const lastelm = itemAr[itemAr.length - 1];
        return lastelm;
      });
      const uniqueArrayValues: string[] = Array.from(new Set(categories));
      if (!!uniqueArrayValues && !!uniqueArrayValues.length) {
        uniqueArrayValues.unshift("All");
        const newAr = uniqueArrayValues.filter((el) => el !== "OTHER");
        newAr.push("OTHER");
        setCategory(newAr);
      }
      setGameLists(items);
    }
  };


  const authHandler = async (code: string, providerCode: string) => {
    if (!allocatedCasino["Super Nova"]?.active) return;

    setOpen(code);

    const { response } = await supernowaServices.authentication({
      game: {
        gameCode: code,
        providerCode: providerCode,
      },
      timestamp: new Date().getTime(),
      user: {
        currency: "INR",
        backUrl: "https://playindia.app/",
      },
    });

    if (response && response?.data && response?.data?.launchURL) {
      const { launchURL } = response?.data;
      setGameLaunchURL(launchURL);
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

  const getSuperNowaGameList = async () => {
    if (!allocatedCasino["Super Nova"]?.active) return;
    const { response } = await supernowaServices.gameLists({
      providerCode: "SN",
    });

    if (
      response &&
      response?.data &&
      response?.data?.games &&
      response?.data?.games.length
    ) {
      const { games } = response?.data;
      setCustomProviderGames(
        games.map((item: any) => ({
          ...item,
          gameName: item.name,
          gameId: item.code,
        }))
      );
      setIsLoading(false);
    }
  };

  const getCustomGameProviderLists = async (
    apiUrl?: string,
    value?: number
  ) => {
    setIsLoading(true);
    setCustomProviderGames([]);
    if (value === 323334 && apiUrl) {
      axios.get(apiUrl).then((res) => setCustomProviderGames(res?.data?.data));
      setIsLoading(false);
    } else {
      getSuperNowaGameList();
    }
  };

  const getProviderValue = function (
    value: string,
    customFilter?: boolean,
    games?: GameInterface[],
    type?: string,
    apiUrl?: string,
    providerId?: number
  ) {
    setTimeout(() => {
      if (screenRef?.current) {
        screenRef.current.scrollIntoView(true);
      }
    }, 800);

    if (type == "custom") {
      setCustomGameProvider(true);
      if (value === "QTech-Lobby") {
        showAndHideHandler();
      }
      if (providerId) {
        getCustomGameProviderLists(apiUrl, providerId);
      }
    } else {
      setCustomGameProvider(false);
      if (value !== SelectedProvider) {
        setGameLists([]);
        setFilterGamesList([]);

        if (!!games && games.length && customFilter) {
          setCustomGameList(games);
        } else {
          setCustomGameList(null);
        }
      }
    }
    setSelectedProvider(value);
  };

  useEffect(() => {
    setGameLists([]);
    setCategory([]);
    setFilterValue(null);
    const accessToken = window.localStorage.getItem("qtech_access_token");
    // authenticationHandler();
    if (accessToken && !customGameProvider) {
      getGameLists(accessToken);
    }
  }, [SelectedProvider, filter]);

  useEffect(() => {
    if (state?.gameCode) {
      setSelectedGame(state.gameCode);
      showAndHideHandler();
    }
  }, [state]);

  const { allocatedCasino } = useContext(UserContext);

  return (
    <>
      <div className={classes["container"]}>
        {!!ShowPortal ? (
          <GamePortal
            gameName={SelectedGame || ""}
            close={showAndHideHandler}
          />
        ) : null}
        <div className={classes["slide_div"]}>
          <div className={classes["side_provider_list"]}>
            <ProvidersTabs
              providerList={
                ["instantWin", "lottery", "slot"].includes(filter)
                  ? undefined
                  : casinoProviderList.filter(
                      (i) =>
                        (i.filterType === "AURA" &&
                          allocatedCasino["Aura"]?.active) ||
                        (i.filterType === "NOWA" &&
                          allocatedCasino["Super Nova"]?.active) ||
                        (!i.providerId && allocatedCasino["QTech"]?.active)
                    )
              }
              getName={getProviderValue}
              value={SelectedProvider || ""}
              filter={filter.toUpperCase()}
            />
          </div>
          <div className={classes["games_div"]}>
            {!CustomGameList && !customGameProvider && Category?.length ? (
              <div className={classes["category_filter_div"]}>
                {Category.map((el) => (
                  <div
                    key={el}
                    onClick={() => filterHandler(el)}
                    className={classes["wrapper"]}
                  >
                    <div
                      className={`${classes["cr"]} ${
                        classes[el === filterValue ? "active" : "unactive"]
                      } `}
                    >
                      <img
                        src={
                          filter == "slot" || filter == "lottery"
                            ? el == "All" || el === "OTHER"
                              ? `/assets/Icon/slot/${el}.png`
                              : "/assets/Icon/slot/slot.png"
                            : `/assets/Icon/casino/${el}.png`
                        }
                        alt={el}
                      />
                      <p>{el}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {!CustomGameList && isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <div className={classes["games_container"]}>
              {!customGameProvider &&
              (filterGamesList?.length || GameLists?.length)
                ? (CustomGameList?.length
                    ? CustomGameList
                    : filterGamesList?.length
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
            {customGameProvider
              ? null
              : !isLoading &&
                !GameLists.length && (
                  <p className={classes["cnt"]}>No Games found</p>
                )}
            {!!customGameProvider ? (
              <Fragment>
                <Box bgcolor={colorHex.bg1}>
                  <Box m={"10px"} display={"flex"} flexWrap="wrap" gap={"10px"}>
                    {!(customProviderGames?.length > 0) && (
                      <Typography
                        textAlign={"center"}
                        sx={{ verticalAlign: "center" }}
                        flex={1}
                      >
                        NO Casino Found
                      </Typography>
                    )}
                    {customProviderGames.map((item) => (
                      <Box
                        width={{
                          xs: "calc(50% - 10px)",
                          sm: "calc(50% - 10px)",
                          md: "calc(25% - 10px)",
                          lg: "calc(20% - 10px)",
                        }}
                        m="auto"
                        className="games"
                      >
                        <StyledGameThumb
                          onClick={
                            item?.providerCode === "SN"
                              ? () =>
                                  authHandler(item?.code!, item.providerCode!)
                              : () => {
                                  setOpen(item.gameId);
                                  setGameLaunchURL(
                                    `https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${item.gameId}`
                                  );
                                }
                          }
                          src={item?.thumb || item?.imageUrl}
                          alt="thumb"
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
                {!!open && (
                  <CasinoGame
                    name={
                      customProviderGames.find((i) => i.gameId === open)
                        ?.gameName
                    }
                    id={open}
                    type={
                      SelectedProvider === "AURA"
                        ? "aura"
                        : SelectedProvider === "NOWA"
                        ? "supernowa"
                        : "qtech"
                    }
                    handleClose={() => setOpen(0)}
                    desktopUrl={gameLaunchURL?.replace("/m.fawk", "/d.fawk")}
                    mobileUrl={gameLaunchURL || ""}
                  />
                )}
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderTabsWithGames;
