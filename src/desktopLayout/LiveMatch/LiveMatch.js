import React, { useEffect, useRef, useState } from "react";

const LiveMatch = ({matchIdForLiveMatch}) => {
  const [TvHideShow, setTvHideShow] = useState(false);

  const handleTvHideShow = () => {
    if (TvHideShow === false) {
      setTvHideShow(true);
    } else {
      setTvHideShow(false);
    }
  };

  const ref = useRef(null);
  const scale = (ref.current?.clientWidth || 300) / 280
  // const [scale, setScale] = useState(1.3);

  // useEffect(() => {
  //   const updateScale = () => {
  //     if (ref.current) {
  //       const newScale = ref.current.clientWidth / 220;
  //       setScale(newScale);
  //     }
  //   };
  //   window.addEventListener("resize", updateScale);
  //   return () => {
  //     window.removeEventListener("resize", updateScale);
  //   };
  // }, [ref]);


  return (
    <>
      <div className="card-header live_match">
        <h6 className="card-title">
          Live Match
          <span className="float-right live_strm" onClick={handleTvHideShow}>
            <i className="fa fa-tv" /> live stream started
          </span>
        </h6>
      </div>
      {TvHideShow ? (
        <div id="scoreboard-box">
          <div className="scorecard scorecard-mobile">
            <div className="score-inner tv-score-container">
              <iframe
              ref={ref}
                // src={`https://stream.openhomepageforapi.live/YGapp/play.html?name=ttfour&amp;autoplay=true`}
                // src={`https://43.205.116.130/tv.php?eventId=${matchIdForLiveMatch}`}
                // src={`https://sqmrtv.in/btv.php?eventId=${matchIdForLiveMatch}`}
                src={`https://100tun.online/web/${matchIdForLiveMatch}.html`}
                width="100%"
                className="score-card tv-iframe desk_score_card"
                style={{
                  aspectRatio: "16/9",
                  transform: `scale(${scale})`,
                }}
                title="scorecord"
                allowFullScreen={true}></iframe>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LiveMatch;
