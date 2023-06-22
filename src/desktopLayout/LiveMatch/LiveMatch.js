import React, { useState } from "react";

const LiveMatch = ({matchIdForLiveMatch}) => {
  const [TvHideShow, setTvHideShow] = useState(false);

  const handleTvHideShow = () => {
    if (TvHideShow === false) {
      setTvHideShow(true);
    } else {
      setTvHideShow(false);
    }
  };


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
            <div className="score-inner">
              <iframe
                // src={`https://stream.openhomepageforapi.live/YGapp/play.html?name=ttfour&amp;autoplay=true`}
                src={`https://43.205.116.130/tv.php?eventId=${matchIdForLiveMatch}`}
                width="100%"
                className="score-card desk_score_card"
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
