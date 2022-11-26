import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { sportServices } from "../../utils/api/sport/services";
import Hero from "./Hero";
import Sports from "./Sports";

const Home = ({}) => {
  const [activeSportList, setActiveSportList] = useState([]);
  const [activeEventList, setActiveEventList] = useState([]);
  const [tabValue, setTab] = useState(0);
  useEffect(() => {
    const getList = async () => {
      const { response } = await sportServices.activeSportList();
      console.log(response);
      if (response?.data) {
        setActiveSportList(response.data);
      }
    };
    getList();
  }, []);
  return (
    <>
      <Hero />
      <Sports />
    </>
  );
};

export default Home;
