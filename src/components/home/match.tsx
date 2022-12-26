import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { colorHex } from "../../constants";

export interface MatchInterface {
  matchName: string;
  matchId: number;
  openDate: string;
  team1Back: number | null;
  team1Lay: number | null;
  team2Back: number | null;
  team2Lay: number | null;
  drawBack: number | null;
  drawLay: number | null;
  live: boolean;
  bm: boolean;
}

interface Props {
  matches: MatchInterface;
}

const buttonGridProps = {
  item: true,
  xl: 1.7,
  lg: 1.8,
  xs: 1.8,
  borderRadius: 1,
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const getDay = (date: string) => {
  const now = new Date();
  const dat = new Date(date);
  const nowDate = now.getUTCDate();
  const datDate = dat.getUTCDate();

  if (nowDate === datDate) return "Today";
  now.setDate(nowDate + 1);
  if (now.getUTCDate() === datDate) return "Tomorrow";

  return days[dat.getDay()];
};
const getTimeInMIn = (date: string) => {
  const dat = new Date(date);
  if (!date) return "";
  let hours: string | number = dat.getUTCHours();
  hours = (hours < 10 ? "0" : "") + hours;

  let mins: string | number = dat.getUTCMinutes();
  mins = (mins < 10 ? "0" : "") + mins;
  return hours + ":" + mins;
};

const ButtonPropps = {
  sx: {
    fullWidth: true,
    minWidth: "",
    fontSize: "0.9rem",
    p: { xs: 0.5, lg: 0 },
    width: { xl: "4rem" },
    mx: -0.25,
    color: "#000",
    fontWeight: 700,
  },
};

const Match = ({ matches }: Props) => {
  const navigate = useNavigate();
  const { isSignedIn } = useContext(UserContext);
  const { setCurrentMatch } = useContext(UserContext);
  return (
    <Grid
      container
      onClick={() => {
        if (isSignedIn && setCurrentMatch) {
          setCurrentMatch(matches);
          navigate(`/sports/details/?match-id=${matches.matchId}`);
        }
      }}
      bgcolor={{ xs: colorHex.bg2, lg: colorHex.bg1 }}
      p={{ xs: 0.5, lg: 0 }}
      sx={{ cursor: "pointer" }}
      m={{ xs: "4px 0px", lg: 0 }}
      gap={{ xs: 0.5, lg: 0 }}
      borderBottom={{ xs: "", lg: "1px solid rgba(60,68,75)" }}
    >
      <Grid
        item
        xs={12}
        lg={6.6}
        bgcolor={colorHex.bg1}
        display="flex"
        fontSize={"0.8rem"}
        alignItems={"center"}
        p={{ xs: 1, lg: 1 }}
      >
        <Box>
          {matches.live ? (
            <Typography
              component={"div"}
              maxWidth={"min-content"}
              overflow="hidden"
              color="secondary.main"
              mx={2}
            >
              Live
              <Box className="live-under">
                <Box className="live-under-under"></Box>
              </Box>
            </Typography>
          ) : (
            <Box
              display="flex"
              width={{ lg: 150 }}
              sx={{
                opacity: 0.6,
                pr: 2,
                flexDirection: { xs: "column", lg: "row" },
                borderRight: `1px solid ${colorHex.borderLine}`,
              }}
              justifyContent={"space-between"}
            >
              <span>{getDay(matches.openDate)}</span>
              <span>{getTimeInMIn(matches.openDate)}</span>
            </Box>
          )}
        </Box>
        <Box textAlign="left" pl={2}>
          {matches.matchName}
        </Box>
      </Grid>
      <Grid
        container
        xs={12}
        lg={5.4}
        maxWidth={{ lg: 356, xl: 700 }}
        ml={{
          lg: "auto",
        }}
        py={{ xs: 0, md: 2, lg: 2 }}
        px={{ xs: 0, md: 4, lg: 1 }}
        display="flex"
        alignItems={"center"}
        gap={{ xs: "1.2%", md: "1.2%", lg: 0.5 }}
      >
        <Grid
          {...buttonGridProps}
          marginLeft={{ xs: 0, md: "auto", lg: 0, xl: "auto" }}
          bgcolor="#72BBEF"
        >
          <Button {...ButtonPropps}>{matches.team1Back || "—"} </Button>
        </Grid>{" "}
        <Grid {...buttonGridProps} marginRight="auto" bgcolor="#F994BA">
          <Button {...ButtonPropps}>{matches.team1Lay || "—"} </Button>
        </Grid>
        <Grid {...buttonGridProps} marginLeft="auto" bgcolor="#72BBEF">
          <Button {...ButtonPropps}>{matches.drawBack || "—"}</Button>
        </Grid>{" "}
        <Grid {...buttonGridProps} marginRight="auto" bgcolor="#F994BA">
          <Button {...ButtonPropps}>{matches.drawLay || "—"}</Button>
        </Grid>
        <Grid {...buttonGridProps} marginLeft="auto" bgcolor="#72BBEF">
          <Button {...ButtonPropps}>{matches.team2Back || "—"} </Button>
        </Grid>
        <Grid
          {...buttonGridProps}
          marginRight={{ xs: 0, md: "auto", lg: 0, xl: "auto" }}
          bgcolor="#F994BA"
        >
          <Button {...ButtonPropps}>{matches.team2Lay || "—"} </Button>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};

export default Match;
