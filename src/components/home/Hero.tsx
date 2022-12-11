import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { HeroImage, HeroImageContainer } from './styledComponents';

const Hero = () => {
  return (
    <div>
      {" "}
      <Carousel
        infiniteLoop
        autoPlay
        interval={3000}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1663934881657.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1664903795346.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1665847514467.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1666608843929.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1668333732137.jpeg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
        <HeroImageContainer>
          <HeroImage src="/assets/banners/1668674044952.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </HeroImageContainer>
      </Carousel>
    </div>
  );
}

export default Hero