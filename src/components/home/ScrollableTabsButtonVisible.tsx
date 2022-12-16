import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMediaQuery } from "@mui/material";
import { colorHex } from "../../constants";

interface TabsProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  color: string;
  sports: any[];
}
export function ScrollableTabsButtonVisible({
  setValue,
  color,
  value,
  sports,
}: TabsProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <Box
      sx={{
        flexGrow: 1,
        // mt: 1,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        TabIndicatorProps={{ sx: { display: "none" } }}
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          bgcolor: colorHex.bg1,
          py: 0,
          minHeight: {
            xs: "44px",
            lg: "30px",
          },
        }}
      >
        {sports.map((s, index) => (
          <Tab
            label={s.name}
            icon={s.icon}
            key={s.name+s.color}
            iconPosition={matches ? "start" : "top"}
            sx={{
              py: 0,
              my: { xs: -1.5, lg: -2.5 },
              bgcolor: index === value ? color : "",
              borderLeft: index !== 0 ? "0.5px solid rgb(60,68,75)" : "",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
