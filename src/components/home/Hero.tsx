import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { userServices } from "../../utils/api/user/services";
import { HeroImage, HeroImageContainer } from "./styledComponents";

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
      <Carousel
        infiniteLoop
        autoPlay
        interval={3000}
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {heroBannerData.map((banner) => (
          <HeroImageContainer key={banner.name + banner.path}>
            <HeroImage src={banner.path} alt={banner.name} />
          </HeroImageContainer>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
