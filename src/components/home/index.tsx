import { ButtonTabs } from "./buttonTabs";
import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero, { BannerInterface } from "./Hero";
import Sports from "./Sports";
import { userServices } from "../../utils/api/user/services";
import { useEffect, useMemo, useRef, useState } from "react";
import TopCasinoHero from "./TopCasinoHero";
import { Box } from "@mui/material";

const Home = () => {
  const [sideBanner, setSideBanner] = useState<BannerInterface[]>([]);
  const scrollCasinoRef = useRef<HTMLDivElement | null>(null);
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
    const timer = setInterval(() => {
      if (scrollCasinoRef?.current) {
        const { scrollTop, offsetHeight, scrollBy, scrollHeight } =
          scrollCasinoRef.current;
        if (scrollTop + offsetHeight + 200 >= scrollHeight) {
          scrollCasinoRef.current.scrollBy({ top: -scrollTop });
        } else {
          scrollCasinoRef.current.scrollBy({ top: 200 });
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
      <ButtonTabs />
      <Sports />
      <TopCasinoHero sideBanner={sideBanner} />
    </HomeLayout>
  );
};

export default Home;
