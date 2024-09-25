import React, { useEffect, useState } from "react";
import CasinoTabs from "./casinoTabs/CasinoTabs";
import { CasinoApi } from "../../apis/CasinoApi";
import { useLocation } from "react-router-dom";
import {
  EvolutionGamming,
  Ezugi,
} from "../../common/casinoProvider/NewCasinoProvider";

const LiveCasino = ({ liveCasino, showid }) => {
  const [category, setCategory] = useState([]);
  const [gameLists, setGameLists] = useState();
  const [providerTag, setProviderTags] = useState("");

  const { state } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("gameToken");

    if (providerTag === "YUILD" || providerTag === "EVO") {
      let categories1 = EvolutionGamming?.map((el) => {
        const itemAr = el?.category.split("/");
        const lastelm = itemAr[itemAr.length - 1];
        return lastelm;
      });
      const uniqueArrayValues1 = Array.from(new Set(categories1));
      if (uniqueArrayValues1.length) {
        uniqueArrayValues1.unshift("ALL");
        const newAr = uniqueArrayValues1.filter((el) => el !== "OTHER");
        newAr.push("OTHER");
        setCategory(newAr);
      }
      setGameLists(EvolutionGamming);
    } else if (providerTag === "EZU") {
      let categories1 = Ezugi?.map((el) => {
        const itemAr = el?.category.split("/");
        const lastelm = itemAr[itemAr.length - 1];
        return lastelm;
      });
      const uniqueArrayValues1 = Array.from(new Set(categories1));
      if (uniqueArrayValues1.length) {
        uniqueArrayValues1.unshift("ALL");
        const newAr = uniqueArrayValues1.filter((el) => el !== "OTHER");
        newAr.push("OTHER");
        setCategory(newAr);
      }
      setGameLists(Ezugi);
    } else {
      CasinoApi.Casino_Gamelist({
        gameCategory: liveCasino,
        provider: providerTag,
        token,
      }).then((response) => {
        if (response?.data?.data?.items?.length) {
          const { items } = response.data.data;
          let categories = items.map((el) => {
            const itemAr = el?.category.split("/");
            const lastelm = itemAr[itemAr.length - 1];
            return lastelm;
          });
          const uniqueArrayValues = Array.from(new Set(categories));
          if (uniqueArrayValues.length) {
            uniqueArrayValues.unshift("ALL");
            const newAr = uniqueArrayValues.filter((el) => el !== "OTHER");
            newAr.push("OTHER");
            setCategory(newAr);
          }
          setGameLists(items);
        }
      });
    }
  }, [providerTag, liveCasino]);


  return (
    <>
      <div className="main">
        <CasinoTabs
          state={state}
          showid={showid}
          liveCasino={liveCasino}
          gameLists={gameLists}
          setProviderTags={setProviderTags}
          providerTag={providerTag}
          category={category}
        />
      </div>
    </>
  );
};

export default LiveCasino;
