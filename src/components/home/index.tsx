import { ButtonTabs } from "./buttonTabs";
import BoxWithTitle from "../common/BoxWithTitle";
import HomeLayout from "../layout/homeLayout";
import { BlinkImage } from "../layout/styledComponents";
import Hero, { BannerInterface } from "./Hero";
import Sports from "./Sports";
import { userServices } from "../../utils/api/user/services";
import { useEffect, useMemo, useState } from "react";
import TopCasinoHero from "./TopCasinoHero";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const homeRightMenu = useMemo(
    () => (
      <BoxWithTitle title="Our Casino">
        <Box
          maxHeight={"calc(100vh - 135px)"}
          minHeight={"calc(100vh - 135px)"}
          sx={{
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
          }}
        >
          <Slider
            vertical
            infinite
            swipeToSlide={true}
            pauseOnHover={false}
            pauseOnFocus={false}
            adaptiveHeight
            slidesToShow={3}
            autoplaySpeed={5000}
            autoplay
            arrows={false}
            slidesToScroll={4}
          >
            {sideBanner.map((banner) => (
              <BlinkImage
                key={banner.name}
                src={banner.path}
                alt={banner.name}
              />
            ))}
          </Slider>
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
