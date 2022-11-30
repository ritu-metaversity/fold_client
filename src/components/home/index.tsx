// import React, { FC, PropsWithChildren, useEffect, useState } from "react";
// import { sportServices } from "../../utils/api/sport/services";
import Hero from "./Hero";
import Sports from "./Sports";
// import { sportsTabList } from "./sportsTabList";

const Home = ({}) => {
  return (
    <>
      <Hero />
      {<Sports />}
    </>
  );
};

export default Home;
