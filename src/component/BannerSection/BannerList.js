import React, { useEffect, useState } from "react";
import "./BannerList.css";
import { GameAPI } from "../../apis/gameAPI";
import Slider from "react-slick";

const BannerList = () => {
  const [BannerImage, setBannerImage] = useState([]);

  useEffect(() => {
    GameAPI.BANNER_LIST({
      type: 1,
    }).then((res) => {
      setBannerImage(res?.data);
    });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <>
      <Slider {...settings}>
        {BannerImage?.length &&
          BannerImage?.map((res, id) => {
            return (
              <div key={id}>
                <img src={res?.path} alt="" className="bannerImage"/>
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default BannerList;
