import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab, { tabClasses } from "@mui/material/Tab";
import { useMediaQuery, useTheme } from "@mui/material";
import { colorHex } from "../../utils/constants";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { TabStyled } from "./styledComponents";

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
    console.log(newValue);
    setValue(newValue);
  };

  const matches = useMediaQuery("(min-width:1280px)");
  console.log(sports[0], "index");
  const theme = useTheme();
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
          [`& .${tabClasses.selected}`]: {
            color: "white !important",
          },
          bgcolor: colorHex.bg1,
          py: 0,
          maxWidth: "100vw",
          width: "100%",
          minHeight: {
            xs: "44px",
            lg: "30px",
          },
        }}
      >
        <TabStyled
          value={0}
          label={"In Play"}
          key={"inplaygray"}
          icon={<AccessAlarmsIcon fontSize="small" />}
          iconPosition={matches ? "start" : "top"}
          sx={{ bgcolor: 0 === value ? "gray" : "" }}
        />
        {sports.map((s) => (
          <TabStyled
            value={s.sportId}
            label={s.name}
            icon={s.iconClass ? <i className={s.iconClass}></i> : s.icon}
            key={s.name + s.color}
            iconPosition={matches ? "start" : "top"}
            sx={{ bgcolor: s.sportId === value ? color : "" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
