import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
// import { grey } from "@mui/material/colors";
import { sportServices } from "../../utils/api/sport/services";
import { sportsTabList } from "./sportsTabList";
import { ScrollableTabsButtonVisible } from "./ScrollableTabsButtonVisible";
import Match from "./match";
import { UserContext } from "../../App";
import "./miniScrollbar.css";
import Loading from "../layout/loading";
import { BoxWithTitleBox } from "../common/styledComponents";

const Sports = () => {
  const [value, setValue] = React.useState(0);
  const { isSignedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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
    // const getListOpen = async () => {
    //   const { response } = await sportServices.activeSportListOpen();
    //   if (response?.data) {
    //     const data = [...response.data];
    //     const data1 = data.map((item) => {
    //       const sport = sportsTabList.find((i) => i.name === item.sportName);
    //       return { ...sport, ...item };
    //     });
    //     setActiveSportList(data1);
    //   }
    // };
    // if (isSignedIn) {
    getList();
    // } else {
    // getListOpen()
    // }
  }, [isSignedIn]);

  useEffect(() => {
    const getNewEvent = async () => {
      if (!activeSportList) return;
      const { sportId } = activeSportList[value];
      if (!sportId) return;
      setLoading(true);
      const { response } = await sportServices.activeEventFromSport(sportId);

      if (response?.data?.length) {
        setActiveEventList(response.data);
      } else {
        setActiveEventList([]);
      }
      setLoading(false);
    };
    const getNewEventOpen = async () => {
      if (!activeSportList) return;
      const { sportId } = activeSportList[value];
      if (!sportId) return;
      setLoading(true);
      const { response } = await sportServices.activeEventFromSportOpen(
        sportId
      );

      if (response?.data?.length) {
        setActiveEventList(response.data);
      } else {
        setActiveEventList([]);
      }
      setLoading(false);
    };

    if (isSignedIn) {
      getNewEvent();
    } else {
      getNewEventOpen();
    }
  }, [value, isSignedIn, activeSportList]);

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
      <Grid
        container
        display={{ xs: "none", lg: "flex" }}
        color="white"
        fontSize="0.9rem"
        bgcolor={color}
      >
        <Grid
          item
          xs={6.6}
          textAlign="left"
          alignItems={"center"}
          display="flex"
        >
          <Box pl={2} pt={0.5}>
            <i className={activeSportList[value]?.iconClass} />
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
      <Box
        id="scrollable-match-list"
        maxHeight={{ xs: "310px", lg: "60vh" }}
        minHeight={{ lg: "calc(100vh - 440px)" }}
        sx={{
          overflowY: "overlay",
          overflowX: "hidden",
          p: { xs: 0.5, lg: 0 },
        }}
      >
        {loading ? (
          <Box height={200}>
            <Loading />
          </Box>
        ) : activeEventList.length > 0 ? (
          activeEventList.map((item) => <Match matches={item} />)
        ) : (
          <BoxWithTitleBox>No Data Found</BoxWithTitleBox>
        )}
      </Box>
    </Box>
  );
};

export default Sports;
