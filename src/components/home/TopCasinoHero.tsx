import { useMediaQuery } from "@mui/material";
import React, { FC, useMemo } from "react";
import BoxWithTitle from "../common/BoxWithTitle";
import { BannerInterface } from "./Hero";
import { HeroImageContainerHalf, HeroImageHalf } from "./styledComponents";
import Slider from "react-slick";

interface Props {
  sideBanner: BannerInterface[];
}
const TopCasinoHero: FC<Props> = ({ sideBanner }) => {
  // const getImages = () => {
  //   let images = [];
  //   for (let i = 0; i < sideBanner.length - 1; i = i + 2) {
  //     const b1 = sideBanner[i];
  //     const b2 = sideBanner[i + 1];
  //     images.push(
  //       <HeroImageContainerHalf key={b1.name + b2.name}>
  //         <HeroImageHalf src={b1.path} alt={b1.name} />
  //         <HeroImageHalf src={b2.path} alt={b2.name} />
  //       </HeroImageContainerHalf>
  //     );
  //   }
  //   return images;
  // };
  const images = useMemo(
    () =>
      (() => {
        let images = [];
        for (let i = 0; i <= sideBanner.length - 1; i = i + 2) {
          const b1 = sideBanner[i];
          const b2 = sideBanner[i + 1];
          images.push(
            <div>
              <HeroImageContainerHalf key={b1.name + b2?.name}>
                {b1 && <HeroImageHalf src={b1.path} alt={b1.name} />}
                {b2 && <HeroImageHalf src={b2.path} alt={b2.name} />}
              </HeroImageContainerHalf>
            </div>
          );
        }
        return images;
      })(),
    [sideBanner]
  );
  const matches = useMediaQuery("(max-width: 1279px)");

  if (!matches) {
    return <></>;
  }
  return (
    <BoxWithTitle title="Our Casino">
      <Slider
        infinite
        swipeToSlide={true}
        pauseOnHover={false}
        pauseOnFocus={false}
        slidesToShow={1}
        autoplaySpeed={5000}
        adaptiveHeight
        autoplay
        arrows={false}
        slidesToScroll={1}
      >
        {/* {sideBanner.map((banner) => (
          // <HeroImageContainer key={banner.name + banner.path}>
          <HeroImageHalf src={banner.path} alt={banner.name} />
          // </HeroImageContainer>
        ))} */}
        {images}
      </Slider>
    </BoxWithTitle>
  );
};

export default TopCasinoHero;
