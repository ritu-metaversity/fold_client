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
// import { sportsTabList } from "./sportsTabList";

export const homeRightMenu = (
  <>
    {/* <BoxWithTitle title="New Launched">
      <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
    </BoxWithTitle> */}
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
  const [sideBanner, setSideBanner] = useState<BannerInterface[]>([]);

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
    <>
      {/* <BoxWithTitle title="New Launched">
      <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
    </BoxWithTitle> */}
      <BoxWithTitle title="Our Casino">
        {sideBanner.map((banner) => (
          <BlinkImage key={banner.name} src={banner.path} alt={banner.name} />
        ))}
      </BoxWithTitle>
    </>
  );
  return (
    <HomeLayout sideWidth={250} sideWidthXl={300} rightMenu={homeRightMenu}>
      <Hero />

      <ButtonTabs />

      <Sports />
    </HomeLayout>
  );
};

export default Home;
