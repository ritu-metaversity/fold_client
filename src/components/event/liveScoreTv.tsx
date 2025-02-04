import { Switch, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sportServices } from "../../utils/api/sport/services";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { MatchInterface } from "../home/match";
import "./liveScoreTv.css";
const LiveScoreTv = ({ lastMatchedTime }: { lastMatchedTime: string }) => {
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("match-id");
  const sportId = searchParams.get("sport-id");
  const [showLive, setShowLive] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showScore2, setShowScore2] = useState(false);
  const [activeEventList, setActiveEventList] = useState<MatchInterface[]>([]);

  const handleShowScoreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowScore(event.target.checked);
    if (showLive) setShowLive(false);
    if (showScore2) setShowScore2(false);
  };
  const handleShowScore2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowScore2(event.target.checked);
    if (showLive) setShowLive(false);
    if (showScore) setShowScore(false);
  };

  const handleShowLiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLive(event.target.checked);
    if (showScore) setShowScore(false);
    if (showScore2) setShowScore2(false);
  };

  const getNewEventOpen = useCallback(async () => {
    if (!sportId) return;
    const { response } = await sportServices.newActiveEvent(Number(sportId));

    if (response?.data?.length) {
      setActiveEventList(response.data);
    } else {
      setActiveEventList([]);
    }
  }, [sportId]);

  useEffect(() => {
    getNewEventOpen();

    return () => {};
  }, [getNewEventOpen]);

  // const channelId = useMemo(
  //   () =>
  //     activeEventList.find((event) => event.matchId.toString() === matchId)
  //       ?.channelId,
  //   [activeEventList, matchId]
  // );

  // const isChannelAvailable = useMemo(
  //   () => (channelId && channelId.toString() !== "0" ? true : false),
  //   [channelId]
  // );
  const ref = useRef<HTMLIFrameElement | null>(null);

  const scale = (ref.current?.clientWidth || 300) / 280;
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Typography
        fontWeight={500}
        // width="100%"
        textAlign={isMobile ? "left" : "center"}
        paddingLeft={isMobile ? "70px" : ""}
        fontSize={{ xs: "0.6rem", position: "relative" }}
      >
        {`${lastMatchedTime || "Not Found"}`}
        <Box
          display="flex"
          alignItems={"center"}
          sx={{ position: "absolute", right: 60, top: "-1.2em" }}
        >
          <ScoreboardIcon className="icon-medium" />
          <Switch
            style={{ marginLeft: "0.2em" }}
            onChange={handleShowScore2Change}
            checked={showScore2}
          />
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          sx={{ position: "absolute", right: -10, top: "-1.2em" }}
        >
          <ScoreboardIcon className="icon-medium" />
          <Switch onChange={handleShowScoreChange} checked={showScore} />
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          sx={{ position: "absolute", left: 0, top: "-1.2em" }}
        >
          <i className="icon-tv d-icon icon-medium"></i>
          <Switch onChange={handleShowLiveChange} checked={showLive} />
        </Box>
      </Typography>
      {showScore && (
        // <ScoreComponent />

        <iframe
          width="100%"
          height="200px"
          title="score-iframe"
          // src={`http://15.207.182.173:3050/event/${matchId}`}
          src={`https://score.247idhub.com/go-score/template/${sportId}/${matchId}`}
          // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sportId}/${matchId}`}
        />
      )}
      {showScore2 && (
        <iframe
          width="100%"
          height="300px"
          title="score-iframe score-iframe2"
          src={`https://score.247idhub.com/index.html/event/${matchId}?theme=dark-wolf`}
        />
      )}
      {showLive && (
        <div className="tv-score-container">
          <iframe
            width="100%"
            ref={ref}
            className="tv-iframe live-iframe"
            style={{
              aspectRatio: "16/9",
              transform: `scale(${scale})`,
            }}
            title="score-iframe"
            src={`https://100tun.online/web/${matchId}.html`}
            // src={`https://luckybet.one/?eventId=${matchId}`}
            //src={`http://13.233.57.150/test.php?ChannelId=${channelId}`}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(LiveScoreTv);
