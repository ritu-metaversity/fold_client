import { ButtonTabs } from "./buttonTabs";
import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero, { BannerInterface } from "./Hero";
import Sports from "./Sports";
import { userServices } from "../../utils/api/user/services";
import { useEffect, useMemo, useRef, useState } from "react";
import TopCasinoHero from "./TopCasinoHero";
import { Box, useMediaQuery } from "@mui/material";

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

  const isLG = useMediaQuery("(min-width: 1600px)");
  console.log(isLG, "lg");
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollCasinoRef?.current) {
        const { scrollTop, offsetHeight, scrollHeight } =
          scrollCasinoRef.current;

        if (scrollTop + offsetHeight + 20 >= scrollHeight) {
          scrollCasinoRef.current.scrollBy({ top: -scrollTop });
        } else {
          console.log(
            isLG ? 179 : 150,
            scrollTop,
            offsetHeight,
            scrollHeight,
            "hgfd"
          );
          scrollCasinoRef.current.scrollTo({
            top: isLG ? scrollTop + 179 : scrollTop + 150,
            // top: 20000,
            left: 0,
          });
          // scrollCasinoRef.current.scrollBy({
          //   top: isLG ? 179 : 150,
          //   left: 0,
          //   behavior: "smooth",
          // });
        }
      }
      return () => clearInterval(timer);
    }, 5000);
    return () => clearInterval(timer);
  }, [scrollCasinoRef?.current, isLG]);

  const homeRightMenu = useMemo(
    () => (
      <BoxWithTitle title="Our Casino">
        <Box
          ref={scrollCasinoRef}
          maxHeight={"calc(100vh - 135px)"}
          minHeight={"calc(100vh - 135px)"}
          sx={{
            scrollBehavior: "smooth",
            overflowY: "auto",
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
