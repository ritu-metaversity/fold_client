import { styled, Tab, Tabs, tabClasses, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import HomeLayout from "../layout/homeLayout";
import GameInfoList from "./gameInfo.json";
import { CasinoIcon, StyledGameThumb } from "./styledComponent";
import { colorHex } from "../../utils/constants";
import { Link } from "react-router-dom";

const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: "20px",
  // marginTop: "5px",
  marginRight: "10px",
  paddingTop: "2px",
  paddingBottom: "2px",
  minHeight: 50,
  border: "2px solid #3c444b",
  [`&.${tabClasses.selected}`]: {
    borderColor: theme.palette.primary.main,
    color: "#AAAFB5",
  },
}));

const Casino = () => {
  const [value, setValue] = useState("1");
  return (
    <HomeLayout>
      <Tabs
        variant="scrollable"
        scrollButtons={true}
        TabScrollButtonProps={{
          sx: {
            opacity: "1 !important",
            bgcolor: colorHex.bg2,
            borderRadius: "50%",
            width: "40px",
            margin: "auto",
            height: "40px",
            marginRight: "10px",
          },
        }}
        TabIndicatorProps={{ sx: { display: "none" } }}
        sx={{
          position: "sticky",
          top: 80,
          paddingY: "0.8rem",
          backgroundColor: colorHex.bg6,
        }}
        value={value}
        onChange={(e, value) => setValue(value)}
      >
        <StyledTab
          icon={<CasinoIcon src="/assets/images/casino.png" />}
          iconPosition="start"
          value="1"
          label="Our Casino"
        />
        <StyledTab
          icon={<CasinoIcon src="/assets/images/casino.png" />}
          iconPosition="start"
          value="2"
          label="Indian Casino"
        />
        <StyledTab
          icon={<CasinoIcon src="/assets/images/casino.png" />}
          iconPosition="start"
          value="3"
          label="Our Virtual"
        />
      </Tabs>
      <Box bgcolor={colorHex.bg1}>
        <Box m={"10px"} display={"flex"} flexWrap="wrap" gap={"10px"}>
          {GameInfoList.map((item) => (
            <Box
              width={{
                xs: "calc(100% - 10px)",
                sm: "calc(50% - 10px)",
                md: "calc(25% - 10px)",
                lg: "calc(20% - 10px)",
                // xl: "calc(20% - 10px)",
              }}
              m="auto"
            >
              <Link to={"/casino/" + item.data__game_id}>
                <StyledGameThumb src={item.data__thumb} alt="thumb" />{" "}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </HomeLayout>
  );
};
export default Casino;
