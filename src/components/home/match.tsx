import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { colorHex } from "../../constants";

interface MatchInterface {
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
const Match = ({ matches }: Props) => {
  return (
    <Grid container bgcolor={colorHex.bg2} p={0.75} m={0.5}>
      <Grid
        item
        xs={12}
        lg={6}
        bgcolor={colorHex.bg1}
        display="flex"
        fontSize={"0.8rem"}
        alignItems={"center"}
        p={2}
      >
        <Grid item xs={3}>
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
            matches.openDate
          )}
        </Grid>
              <Grid textAlign="left" item xs={9}>
        {matches.matchName}
              </Grid>

      </Grid>
      <Grid item xs={12} lg={6} p={2} display="flex" alignItems={"center"}>
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#72BBEF">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.team1Back || "--"}
          </Button>
        </Grid>{" "}
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#F994BA">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.team1Lay || "--"}
          </Button>
        </Grid>
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#72BBEF">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.drawBack || "--"}
          </Button>
        </Grid>{" "}
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#F994BA">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.drawLay || "--"}
          </Button>
        </Grid>
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#72BBEF">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.team2Back || "--"}
          </Button>
        </Grid>
        <Grid item xs={1.8} margin="auto" borderRadius={1} bgcolor="#F994BA">
          <Button sx={{ p: 0.5, color: "#000", fontWeight: 700 }}>
            {matches.team2Lay || "--"}
          </Button>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};

export default Match;
