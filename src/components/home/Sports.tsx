import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  GiCricketBat,
  GiVolleyballBall,
  GiEightBall,
  GiHockey,
} from "react-icons/gi";
import { BiTennisBall } from "react-icons/bi";
import { IoIosFootball, IoIosBasketball } from "react-icons/io";
import { MdSportsKabaddi } from "react-icons/md";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { FaTableTennis } from "react-icons/fa";
import { grey } from "@mui/material/colors";
import { colorHex } from "../../constants";

export const sportsTabList = [
  {
    name: "Cricket",
    icon: <GiCricketBat />,
    color: "#20327B",
  },
  {
    name: "Football",
    icon: <IoIosFootball />,
    color: "#03B37F",
  },
  {
    name: "Tennis",
    icon: <BiTennisBall />,
    color: "#F18521",
  },
  {
    name: "Kabaddi",
    icon: <MdSportsKabaddi />,
    color: "#6e2e26",
  },
  {
    name: "Table Tennis",
    icon: <FaTableTennis />,
    color: "#DB2752",
  },
  {
    name: "Basketball",
    icon: <IoIosBasketball />,
    color: "#FBB03B",
  },
  {
    name: "Volleyball",
    icon: <GiVolleyballBall />,
    color: "#074A60",
  },
  {
    name: "Snookers",
    icon: <GiEightBall />,
    color: "#11B24B",
  },
  {
    name: "Ice Hockey",
    icon: <GiHockey />,
    color: "#3D2B58",
  },
];

interface TabsProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  color: string;
  sports: any[];
}
function ScrollableTabsButtonVisible({
  setValue,
  color,
  value,
  sports,
}: TabsProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const matches = useMediaQuery("(min-width:1200px)");

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        TabScrollButtonProps={
          {
            // sx: { borderRight: "0.5px solid #d9d9d9", }
          }
        }
        TabIndicatorProps={{ sx: { display: "none" } }}
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          bgcolor: colorHex.bg1,
          py: 0,
          minHeight: "40px",
        }}
      >
        {sports.map((s, index) => (
          <Tab
            label={s.name}
            icon={s.icon}
            iconPosition={matches ? "start" : "top"}
            sx={{
              py: 0,
              my: -2,
              bgcolor: index === value ? color : "",
              borderLeft: index !== 0 ? "0.5px solid #d9d9d9" : "",
            }}
          />
        ))}
        {/* <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
    </Box>
  );
}

const Sports = ({ sportsList }: any) => {
  const [value, setValue] = React.useState(0);
  const color = sportsList[value]?.color;
  return (
    <div>
      <ScrollableTabsButtonVisible
        value={value}
        color={color}
        setValue={setValue}
        sports={sportsList}
      />
      <Grid container bgcolor={color}>
        <Grid item xs={6} textAlign="left" display="flex">
          <Box pl={2} py={0.5}>
            {sportsTabList[value]?.icon}
          </Box>
          <Box pl={2} py={0.5}>
            {sportsTabList[value]?.name}
          </Box>
        </Grid>
        <Grid item xs={0} pl={2} py={0.5} lg={2}>
          1
        </Grid>
        <Grid item xs={0} pl={2} py={0.5} lg={2}>
          x
        </Grid>
        <Grid item xs={0} pl={2} py={0.5} lg={2}>
          2
        </Grid>
      </Grid>
    </div>
  );
};

export default Sports;
