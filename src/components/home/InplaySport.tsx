import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Match, { MatchInterface } from "./match";
import { BoxWithTitleBox } from "../common/styledComponents";
import { sportServices } from "../../utils/api/sport/services";
import { SportHeader } from "./Sports";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Box } from "@mui/material";
import { isMobile } from "react-device-detect";
import Loading from "../layout/loading";
import { UserContext } from "../../App";
import { sportsTabList } from "./sportsTabList";

interface SportInterface {
  sportid: number;
  name: string;
  matchList: MatchInterface[];
  iconClass: string;
  color: string;
}
const InplaySport = () => {
  const [activeMatches, setActiveMatches] = useState<SportInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      const { response } = await sportServices.allActiveEvent();
      if (response) {
        console.log(response);
        setActiveMatches(
          response?.data
            ?.filter((sports: SportInterface) => sports.matchList?.length)
            .map((sport: SportInterface) => {
              const colorData = sportsTabList.find(
                (i) => i.name.toLowerCase() === sport.name.toLowerCase()
              );
              return { ...sport, ...(colorData ? colorData : {}) };
            }) || []
        );
      }
      setLoading(false);
    };

    getMatches();
    return () => {};
  }, []);
  return (
    <Box
      maxHeight={{ xs: "310px", lg: "100%" }}
      // minHeight={{ lg: "calc(100vh - 440px)" }}
      sx={{
        overflowY: "overlay",
        overflowX: "hidden",
        p: { xs: 0.5, lg: 0 },
      }}
      id={
        isMobile
          ? "scrollable-match-list-mobile"
          : "scrollable-match-list-desktop"
      }
    >
      {loading ? (
        <Box height={200}>
          <Loading />
        </Box>
      ) : activeMatches.length > 0 ? (
        activeMatches.map((sport) => (
          <>
            <SportHeader
              color={sport.color}
              name={sport.name}
              iconClass={sport.iconClass}
            />
            <Box
            // maxHeight={{ xs: "310px", lg: "100%" }}
            // // minHeight={{ lg: "calc(100vh - 440px)" }}
            // sx={{
            //   overflowY: "overlay",
            //   overflowX: "hidden",
            //   p: { xs: 0.5, lg: 0 },
            // }}
            >
              {sport.matchList?.map((item) => (
                <Match
                  key={"sportlist" + item?.matchId}
                  sportId={sport?.sportid?.toString()}
                  matches={item}
                />
              ))}
            </Box>
          </>
        ))
      ) : (
        <BoxWithTitleBox>No Data Found</BoxWithTitleBox>
      )}
    </Box>
  );
};

export default InplaySport;
