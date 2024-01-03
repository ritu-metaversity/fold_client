import { useLocation } from "react-router-dom";
import { GameInterface } from "../providerTabsWithGames/providerTabsWithGames";
import { ProviderInterface } from "../providerTabsWithGames/providers.data";
import classes from "./providers.module.css";
import { useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";

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
  filter?: string;
}

function ProvidersTabs({ getName, value, providerList, cls, filter }: Props) {
  const { state } = useLocation();
  const [providerListFromApi, setProviderListFromApi] = useState<string[]>([]);
  const [providerListFromApiRaw, setProviderListFromApiRaw] = useState<any[]>(
    []
  );
  const getProviderListFromApi = async () => {
    const { response } = await qTechServices.providerLists(filter || "");
    if (response?.data) {
      setProviderListFromApiRaw(response.data);
      setProviderListFromApi(response.data.map((o: any) => o.providerId));
    }
  };
  useEffect(() => {
    filter && getProviderListFromApi();
  }, [filter]);
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
      {providerList.map(
        (el) =>
          (!filter ||
            providerListFromApi.includes(el.filterType) ||
            el.customFilter) && (
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
          )
      )}
    </div>
  );
}

export default ProvidersTabs;
