import { memo, useEffect } from "react";
import { GameInterface } from "../providerTabsWithGames/providerTabsWithGames";
import { ProviderInterface } from "../providerTabsWithGames/providers.data";
import classes from "./providers.module.css";

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
  useEffect(() => {
    const el = providerList[0];
    getName(
      el?.filterType,
      el?.customFilter,
      el?.games,
      el?.type,
      el?.apiUrl,
      el?.providerId
    );
  }, [providerList]);

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

export default memo(ProvidersTabs);
