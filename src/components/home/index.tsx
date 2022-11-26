import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { sportServices } from "../../utils/api/sport/services";
import Hero from "./Hero";
import Sports, { sportsTabList } from "./Sports";

const Home = ({}) => {
  const [activeSportList, setActiveSportList] = useState<any>(null);
  const [activeEventList, setActiveEventList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const { response } = await sportServices.activeSportList();
      if (response?.data) {
        const data = [...response.data];
        const data1 = data.map((item) => {
          const sport = sportsTabList.find((i) => i.name === item.sportName);
          return { ...sport, ...item };
        });
        setActiveSportList(data1);
      }
    };
    getList();
  }, []);
  return (
    <>
      <Hero />
      {activeSportList && <Sports sportsList={activeSportList} />}
    </>
  );
};

export default Home;
