import "./video.css";
import { useEffect, useState } from "react";
// import CardOnVideo from "../odds/t20TeenPatti/cardOnVideo";
// import SingleCardOnVideo from "../odds/lucky7B/SingleCardOnVideo";
// import { videoIdById } from "../../utils/constants";
// import OtpCardOnVideo from "./components/OtpCardOnVideo";

// import PokerCardOnVideo from "./components/PokerCardOnVideo";
// import AndarBaharCardOnVideo from "./components/AndarBaharCardOnVideo";
import Card2OnVideo from "../DT20/Card2OnVideo/Card2OnVideo";
import FlipClockCountdown from "../clock/FlipClockCountDown";
import { videoIdById } from "../Constant/Constant";
import { useParams } from "react-router-dom";
import CardOnVideo from "../CardOnVideo/CardOnVideo";
import AndarBaharCardOnVideo from "../andarBahar/AndarBaharCardOnVideo";
import SingleCardOnVideo from "../aaa/SingleCardOnVideo";

const Video= ({ t1, t3 }) => {
  // const id = window.location.pathname.replace("/", "");
  const {id} = useParams();
  const [first, setFirst] = useState(0);

  useEffect(() => {
    if (first === 0 && Number(t1.autotime)) {
      setFirst(new Date().getTime() + Number(t1?.autotime) * 1000);
    } else if (t1.autotime == "0" && first !== 0) {
      setFirst(0);
    }
    return () => {};
  }, [t1?.autotime]);

  const cardOnVideoById = {
    "51": <CardOnVideo t1={t1} />,
    "52": <Card2OnVideo t1={t1} />,
    "54": <SingleCardOnVideo t1={t1} />,
    "60": <AndarBaharCardOnVideo t3={t3} />,
    "61": <Card2OnVideo t1={t1} />,
    "55": <SingleCardOnVideo t1={t1} />,
    "53": <SingleCardOnVideo t1={t1} />,
    // "56": <OtpCardOnVideo t1={t1} />,
    "57": <CardOnVideo t1={t1} />,
    // "58": <PokerCardOnVideo t1={t1} />,
    // "59": <PokerCardOnVideo t1={t1} />,
  };
  return (
    <div className="video_block_container">
      <div className="video_iframe_container">
        <iframe
        title="Hello"
          src={`https://stream.1ex99.com/casinoVideo/video?id=${videoIdById[id]}`}
          
        ></iframe>
      </div>
      <FlipClockCountdown
        className="countdown_container"
        to={first}
        renderMap={[false, false, false, true]}
        showLabels={false}
      />
      {t1 && cardOnVideoById[id]}
    </div>
  );
};

export default Video;
