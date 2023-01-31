import { ButtonTabs } from './buttonTabs';
// import React, { FC, PropsWithChildren, useEffect, useState } from "react";
// import { sportServices } from "../../utils/api/sport/services";

import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero, { BannerInterface } from "./Hero";
import Sports from "./Sports";
import { userServices } from "../../utils/api/user/services";
import { useEffect, useState } from "react";
import TopCasinoHero from "./TopCasinoHero";
import { useMediaQuery } from "@mui/material";

const Home = () => {
  const [sideBanner, setSideBanner] = useState<BannerInterface[]>([]);
  const matches = useMediaQuery("(max-width: ");
  const getBannerList = async () => {
    const { response } = await userServices.bannerList(2);
    if (response?.data?.length) {
      setSideBanner(response.data);
    } else {
      setSideBanner([]);
    }
  };

  useEffect(() => {
    getBannerList();

    return () => {};
  }, []);

  const homeRightMenu = (
    <BoxWithTitle title="Our Casino">
      {sideBanner.map((banner) => (
        <BlinkImage key={banner.name} src={banner.path} alt={banner.name} />
      ))}
    </BoxWithTitle>
  );

  return (
    <HomeLayout sideWidth={250} sideWidthXl={300} rightMenu={homeRightMenu}>
      <Hero />
      <TopCasinoHero sideBanner={sideBanner} />
      <ButtonTabs />
      <Sports />
    </HomeLayout>
  );
};

export default Home;
