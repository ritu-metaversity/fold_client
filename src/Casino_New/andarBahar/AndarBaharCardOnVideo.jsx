import React from "react";
import Slider, { Settings } from "react-slick";
import CardComp from "../CardComp/CardComp";


const settings = {
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const AndarBaharCardOnVideo  = ({ t3 }) => {
  const ball = t3 && t3[0]?.ball ? t3[0]?.ball?.split(",") : [];
  const aall = t3 && t3[0]?.aall ? t3[0]?.aall?.split(",") : [];

  return (
    <>
      {(t3 && (t3[0]?.ball || t3[0]?.aall)) && (
        <div className="card_shown_on_top card_shown_on_top_andar_bahar ">
          <div className="round_id">Andar</div>
          <Slider {...settings} className="ander_slick">
            {aall.map((sid) => {return(
              <CardComp shown={true} card={sid} />
            )}
            )}
          </Slider>
          <div className="round_id">Bahar</div>
          <Slider {...settings} className="ander_slick">
            {ball.map((sid) => (
              <CardComp shown={true} card={sid} />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default AndarBaharCardOnVideo;
