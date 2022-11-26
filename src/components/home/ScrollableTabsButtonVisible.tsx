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
      </Tabs>
    </Box>
  );
}
