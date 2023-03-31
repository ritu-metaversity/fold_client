import { Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sportServices } from "../../utils/api/sport/services";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { MatchInterface } from "../home/match";

const LiveScoreTv = ({ lastMatchedTime }: { lastMatchedTime: string }) => {
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("match-id");
  const sportId = searchParams.get("sport-id");
  const [showLive, setShowLive] = useState(false);
  const [showScore, setShowScore] = useState(true);
  const [activeEventList, setActiveEventList] = useState<MatchInterface[]>([]);

  const handleShowScoreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowScore(event.target.checked);
    if (showLive) setShowLive(false);
  };

  const handleShowLiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLive(event.target.checked);
    if (showScore) setShowScore(false);
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

  const channelId = useMemo(
    () =>
      activeEventList.find((event) => event.matchId.toString() === matchId)
        ?.channelId,
    [activeEventList, matchId]
  );

  const isChannelAvailable = useMemo(
    () => (channelId && channelId.toString() !== "0" ? true : false),
    [channelId]
  );
  return (
    <>
      <Typography
        fontWeight={500}
        width="100%"
        fontSize={{ xs: "0.6rem", position: "relative" }}
      >
        LastMatched {lastMatchedTime}
        <Box
          display="flex"
          alignItems={"center"}
          sx={{ position: "absolute", right: 0, top: "-1.2em" }}
        >
          <ScoreboardIcon className="icon-medium" />
          <Switch onChange={handleShowScoreChange} checked={showScore} />{" "}
        </Box>
        {isChannelAvailable && (
          <Box
            display="flex"
            alignItems={"center"}
            sx={{ position: "absolute", left: 0, top: "-1.2em" }}
          >
            <i className="icon-tv d-icon icon-medium"></i>
            <Switch onChange={handleShowLiveChange} checked={showLive} />
          </Box>
        )}
      </Typography>
      {showScore && (
        <iframe
          width="100%"
          height="200px"
          title="score-iframe"
          src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sportId}/${matchId}`}
        />
      )}
      {isChannelAvailable && showLive && (
        <iframe
          width="100%"
          className="live-iframe"
          title="score-iframe"
          src={`http://13.233.57.150/test.php?ChannelId=${channelId}`}
        />
      )}
    </>
  );
};

export default React.memo(LiveScoreTv);
