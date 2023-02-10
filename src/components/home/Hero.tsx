import React, { useEffect, useState } from "react";
import { userServices } from "../../utils/api/user/services";
import { HeroImage, HeroImageContainer } from "./styledComponents";
import Slider from "react-slick";
export interface BannerInterface {
  name: string;
  path: string;
  priority: number;
}
const Hero = () => {
  const [heroBannerData, setHeroBannerData] = useState<BannerInterface[]>([]);

  const getBannerList = async () => {
    const { response } = await userServices.bannerList(1);
    if (response?.data?.length) {
      setHeroBannerData(response.data);
    } else {
      setHeroBannerData([]);
    }
  };
  useEffect(() => {
    getBannerList();

    return () => {};
  }, []);

  return (
    <div>
      {" "}
      <Slider
        infinite
        swipeToSlide={true}
        pauseOnHover={false}
        pauseOnFocus={false}
        autoplaySpeed={5000}
        autoplay
        arrows={false}
      >
        {heroBannerData.map((banner) => (
          <HeroImageContainer key={banner.name + banner.path}>
            <HeroImage src={banner.path} alt={banner.name} />
          </HeroImageContainer>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
