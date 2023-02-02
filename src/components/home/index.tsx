import { ButtonTabs } from './buttonTabs';
// import React, { FC, PropsWithChildren, useEffect, useState } from "react";
// import { sportServices } from "../../utils/api/sport/services";

import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero, { BannerInterface } from "./Hero";
import Sports from "./Sports";
import { userServices } from "../../utils/api/user/services";
import { useEffect, useMemo, useRef, useState } from "react";
import TopCasinoHero from "./TopCasinoHero";
import { Box, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [sideBanner, setSideBanner] = useState<BannerInterface[]>([]);
  const scrollCasinoRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (scrollCasinoRef?.current) {
      console.log(scrollCasinoRef.current?.scrollTop);
    }
    const timer = setInterval(() => {
      console.log(
        "ran",
        scrollCasinoRef?.current,
        scrollCasinoRef.current?.scrollTop,
        scrollCasinoRef?.current?.clientHeight,
        scrollCasinoRef?.current?.scrollHeight,
        scrollCasinoRef?.current?.offsetHeight
      );
      if (scrollCasinoRef?.current) {
        if (
          scrollCasinoRef.current.scrollTop +
            scrollCasinoRef?.current?.offsetHeight +
            200 >=
          scrollCasinoRef.current.scrollHeight
        ) {
          scrollCasinoRef.current.scrollBy({
            top: -scrollCasinoRef.current.scrollTop,
          });
        } else {
          scrollCasinoRef.current.scrollBy({
            top: 200,
          });
        }
      }
      return () => clearInterval(timer);
    }, 3000);
  }, [scrollCasinoRef?.current]);
  const homeRightMenu = useMemo(
    () => (
      <BoxWithTitle title="Our Casino">
        <Box
          ref={scrollCasinoRef}
          maxHeight={"calc(100vh - 100px)"}
          sx={{
            scrollBehavior: "smooth",
            overflowY: "auto",
            scrollbarWidth: "0px",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
          }}
        >
          {sideBanner.map((banner) => (
            <BlinkImage key={banner.name} src={banner.path} alt={banner.name} />
          ))}
        </Box>
      </BoxWithTitle>
    ),
    [sideBanner]
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
