import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
// import { grey } from "@mui/material/colors";
import { sportServices } from "../../utils/api/sport/services";
import { sportsTabList } from "./sportsTabList";
import { ScrollableTabsButtonVisible } from "./ScrollableTabsButtonVisible";
import Match from "./match";

const Sports = () => {
  const [value, setValue] = React.useState(0);
  const [activeSportList, setActiveSportList] = useState<any>(null);
  const [activeEventList, setActiveEventList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const { response } = await sportServices.activeSportList();
      if (response?.data) {
        const data = [...response.data];
        const data1 = data.map((item) => {
          const sport = sportsTabList.find((i) => i.name === item.sportName);
          return { ...sport, ...item };
        });
        setActiveSportList(data1);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    const getNewEvent = async () => {
      if (!activeSportList) return;
      const { sportId } = activeSportList[value];
      console.log(sportId);
      if (!sportId) return;

      const { response } = await sportServices.activeEventFromSport(sportId);

      if (response?.data) {
        // setActiveEventList(response.data);
        if (response?.data?.length > 0) {
          // const events = response?.data.map((item: any) => item.eventId);
          // const { response: response1 } = await sportServices.matchOdds(events);
          // console.log(response1);
          setActiveEventList(response.data);
          // if (response1?.data?.length > 0) {
          //   const newEventList = response.data.map((event: any) => {
          //     const match = response1.data.find(
          //       (i: any) => i.matchId === event.eventId
          //     );
          //     event["inPlay"] = match?.inPlay;
          //     event["runner"] = match?.runner;
          //     return event;
          //   });
          //   setActiveEventList(newEventList);
          //   console.log(newEventList);
          // }
        }
      } else {
        setActiveEventList([]);
      }
    };
    getNewEvent();
  }, [value, activeSportList]);

  if (!(activeSportList?.length > 0)) {
    return <div></div>;
  }
  const color = activeSportList[value]?.color;

  return (
    <Box color="text.secondary">
      <ScrollableTabsButtonVisible
        value={value}
        color={color}
        setValue={setValue}
        sports={activeSportList}
      />
      <Grid container display={{ xs: "none", lg: "flex" }} bgcolor={color}>
        <Grid
          item
          xs={6.6}
          textAlign="left"
          alignItems={"center"}
          display="flex"
        >
          <Box pl={2} pt={0.5}>
            {sportsTabList[value]?.icon}
          </Box>
          <Box pl={0.5} py={0.5}>
            {sportsTabList[value]?.name}
          </Box>
        </Grid>
        <Grid
          container
          lg={5.4}
          maxWidth={{ lg: 356, xl: 700 }}
          ml={{
            lg: "auto",
          }}
          pr={{ lg: 2 }}
          display="flex"
          alignItems={"center"}
        >
          <Grid item xs={0} pl={2} py={0.5} lg={4}>
            1
          </Grid>
          <Grid item xs={0} pl={2} py={0.5} lg={4}>
            X
          </Grid>
          <Grid item xs={0} pl={2} py={0.5} lg={4}>
            2
          </Grid>
        </Grid>
      </Grid>
      {activeEventList.map((item) => (
        <Match matches={item} />
      ))}
    </Box>
  );
};

export default Sports;
