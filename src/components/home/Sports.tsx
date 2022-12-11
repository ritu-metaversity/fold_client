import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
// import { grey } from "@mui/material/colors";
import { sportServices } from "../../utils/api/sport/services";
import { sportsTabList } from "./sportsTabList";
import { ScrollableTabsButtonVisible } from "./ScrollableTabsButtonVisible";
import Match from "./match";
import { UserContext } from "../../App";

const Sports = () => {
  const [value, setValue] = React.useState(0);
  const { isSignedIn} = useContext(UserContext)
  const [activeSportList, setActiveSportList] = useState<any>(null);
  const [activeEventList, setActiveEventList] = useState([]);
  useEffect(() => {
    if (isSignedIn === null) return;
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
    const getListOpen = async () => {
      const { response } = await sportServices.activeSportListOpen();
      if (response?.data) {
        const data = [...response.data];
        const data1 = data.map((item) => {
          const sport = sportsTabList.find((i) => i.name === item.sportName);
          return { ...sport, ...item };
        });
        setActiveSportList(data1);
      }
    };
    if (isSignedIn) {
      
      getList();
    } else {
      getListOpen()
    }
  }, [isSignedIn]);

  useEffect(() => {
    const getNewEvent = async () => {
      if (!activeSportList) return;
      const { sportId } = activeSportList[value];
      if (!sportId) return;

      const { response } = await sportServices.activeEventFromSport(sportId);

      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
        }
      } else {
        setActiveEventList([]);
      }
    };
        const getNewEventOpen = async () => {
          if (!activeSportList) return;
          const { sportId } = activeSportList[value];
          if (!sportId) return;

          const { response } = await sportServices.activeEventFromSportOpen(
            sportId
          );

          if (response?.data) {
            if (response?.data?.length > 0) {
              setActiveEventList(response.data);
            }
          } else {
            setActiveEventList([]);
          }
        };
    if (isSignedIn) {
      
      getNewEvent();
    } else {
      getNewEventOpen()
    }
  }, [value, activeSportList]);

  if (!(activeSportList?.length > 0)) {
    return <div></div>;
  }
  const color = activeSportList[value]?.color;
console.log()
  return (
    <Box color="text.secondary">
      <ScrollableTabsButtonVisible
        value={value}
        color={color}
        setValue={setValue}
        sports={activeSportList}
      />
      <Grid container display={{ xs: "none", lg: "flex" }} color="white"
        fontSize= "0.9rem"
        bgcolor={color}>
        <Grid
          item
          xs={6.6}
          textAlign="left"
          alignItems={"center"}
          display="flex"
        >
          <Box pl={2} pt={0.5}>
            {activeSportList[value]?.icon}
          </Box>
          <Box pl={0.5} py={0.5}>
            {activeSportList[value]?.name}
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
