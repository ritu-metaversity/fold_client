import { useLocation } from "react-router-dom";
import { GameInterface } from "../providerTabsWithGames/providerTabsWithGames";
import { ProviderInterface } from "../providerTabsWithGames/providers.data";
import classes from "./providers.module.css";
import { useEffect } from "react";

interface Props {
  getName: (
    value: string,
    customFilter?: boolean,
    games?: GameInterface[],
    type?: string,
    apiUrl?: string,
    providerId?: number
  ) => void;
  value: string;
  providerList: ProviderInterface[];
  cls?: string;
}

function ProvidersTabs({ getName, value, providerList, cls }: Props) {
  const { state } = useLocation();
  useEffect(() => {
    if (state?.filterType) {
      const el = providerList.find((i) => i.filterType === state.filterType);
      el &&
        getName(
          el?.filterType,
          el?.customFilter,
          el?.games,
          el?.type,
          el?.apiUrl,
          el?.providerId
        );
    } else {
      const el = providerList[0];
      if (el) {
        getName(
          el?.filterType,
          el?.customFilter,
          el?.games,
          el?.type,
          el?.apiUrl,
          el?.providerId
        );
      }
    }
  }, [state]);
  return (
    <div className={!cls ? classes["contianer"] : classes[cls!]}>
      {providerList.map((el) => (
        <div
          onClick={() =>
            getName(
              el?.filterType,
              el?.customFilter,
              el?.games,
              el?.type,
              el?.apiUrl,
              el?.providerId
            )
          }
          key={el?.name}
          className={classes["tab_container"]}
        >
          <div
            className={`${classes["tab"]} ${
              classes[value === el?.filterType ? "active" : ""]
            }`}
          >
            <img src={el?.logo} alt="provider logo" />
            <p>{el?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProvidersTabs;
