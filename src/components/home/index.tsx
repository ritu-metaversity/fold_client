// import React, { FC, PropsWithChildren, useEffect, useState } from "react";
// import { sportServices } from "../../utils/api/sport/services";
import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero from "./Hero";
import Sports from "./Sports";
// import { sportsTabList } from "./sportsTabList";

const rightMenu = (
  <>
    <BoxWithTitle title="New Launched">
      <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
    </BoxWithTitle>
    <BoxWithTitle title="Our Casino">
      <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
      <BlinkImage src="/assets/lc/abj.jpg" alt="" />
      <BlinkImage src="/assets/lc/card32.jpg" alt="" />
      <BlinkImage src="/assets/lc/dt6.jpg" alt="" />
      <BlinkImage src="/assets/lc/dt20.jpg" alt="" />
      <BlinkImage src="/assets/lc/dt202.jpg" alt="" />
      <BlinkImage src="/assets/lc/dum10.jpg" alt="" />
      <BlinkImage src="/assets/lc/kbc.jpg" alt="" />
    </BoxWithTitle>
  </>
);
const Home = () => {
  return (
    <HomeLayout sideWidth={250} sideWidthXl={300} rightMenu={rightMenu} >
      <Hero />
      {<Sports />}
    </HomeLayout>
  );
};

export default Home;
