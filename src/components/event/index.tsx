import { OddsNumberTitle } from './OddsNumberTitle';
import { OddsNumberTitleTwo } from './OddsNumberTitleTwo';
import Odds from "./odds";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import CustomizedAccordions from "./CustomizedAccordian";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import OddsOnlyTwo from "./oddsOnlyTwo";
import HomeLayout from "../layout/homeLayout";
import { BetSlip } from "./BetSlip";
import { colorHex } from "../../constants";
import MyBet from './MyBet';
import CustomizedDialog2 from "../common/Dailog2";
import MybetMobile from './MybetMobile';
import { userServices } from '../../utils/api/user/services';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';


const bets = {
  fancy: [
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "back",
    },
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "lay",
    },
  ],
  Bookmaker: [
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "lay",
    },
    {
      name: "PAK Will Win the Toss bhav(PAK vs ENG)adv",
      value: "1.95",
      amount: "100",
      type: "back",
    },
  ],
};

interface BetsInterface {
  [x: string]: {
    nation: string;
    rate: number;
    amount: number;
    priveValue: number;
    marketName: string;
    back: boolean;
  }[];
}

const value = -1;
const Event = () => {
  const [bets, setBets] = useState<BetsInterface | null>(null);
  const [betId, setBetId] = useState(0);
  const [searchParams] = useSearchParams();
  const {isSignedIn}  = useContext(UserContext)
  const { title } = {
    title: <Typography fontSize={"0.85rem"}>Pakistan</Typography>,
  };
  const matches = useMediaQuery("(max-width : 1280px)");
  const matchId = searchParams.get("match-id")
  console.log(matchId)

  const getBets = async () => {
    if (!matchId || !isSignedIn) return;
    const { response } = await userServices.betListByMatch(matchId);
    console.log(response)
    if (response?.data) {
      setBets(response.data)
    }
  }
  useEffect(() => {
    getBets()
    return () => {
      
    }
  }, [isSignedIn])
  
  if (!matchId) return <></>;

  console.log(matches);
  return (
    <Box m={0.3} mt={0.6}>
      <HomeLayout
        sideWidth={364}
        sideWidthXl={364}
        rightMenu={
          <Box
            borderRadius={2}
            color="text.secondary"
            p={1}
            bgcolor={colorHex.bg1}
            height={"100%"}
          >
            <BetSlip betId={betId} setBetId={setBetId} />
            {bets && <MyBet bets={bets} />}
          </Box>
        }
      >
        {bets && <MybetMobile bets={bets} ></MybetMobile>}
        <CustomizedDialog2
          title="Bet Slip"
          open={Boolean(betId) && matches}
          handleClose={() => setBetId(0)}
        >
          <BetSlip betId={betId} setBetId={setBetId} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
          <BetResult title={"Eastern Suburbs (Women) W"} value={value} />
        </CustomizedDialog2>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" lineHeight={1} fontWeight={500}>
                MATCH_ODDS
              </Typography>
              <Typography fontSize="0.85rem" lineHeight={1} fontWeight={700}>
                Max: 10k
              </Typography>
            </Box>
          }
        >
          <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
            <OddsNumberTitle />
            <Odds setBetId={setBetId} title={title} />
            <Odds setBetId={setBetId} title={title} />
            <Odds setBetId={setBetId} title={title} />
          </Box>
        </CustomizedAccordions>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" fontWeight={500}>
                Bookmaker
              </Typography>
              <Typography fontSize="0.85rem" fontWeight={700}>
                Min:100 Max:10L
              </Typography>
            </Box>
          }
        >
          <Box pb={{ xs: 1 }} px={{ xs: 1.5 }}>
            <OddsNumberTitle />
            <Odds setBetId={setBetId} title={title} />
            <Odds setBetId={setBetId} title={title} />
            <Odds setBetId={setBetId} title={title} />
          </Box>
        </CustomizedAccordions>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" fontWeight={500}>
                Normal
              </Typography>
            </Box>
          }
        >
          <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
            <OddsNumberTitleTwo />
            <OddsNumberTitleTwo />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
          </Grid>
        </CustomizedAccordions>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" fontWeight={500}>
                Over By Over
              </Typography>
            </Box>
          }
        >
          <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
            <OddsNumberTitleTwo />
            <OddsNumberTitleTwo />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
          </Grid>
        </CustomizedAccordions>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" fontWeight={500}>
                Meter
              </Typography>
            </Box>
          }
        >
          <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
            <OddsNumberTitleTwo />
            <OddsNumberTitleTwo />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
          </Grid>
        </CustomizedAccordions>

        <CustomizedAccordions
          title={
            <Box flex={1} display="flex" justifyContent={"space-between"}>
              <Typography fontSize="0.85rem" fontWeight={500}>
                Fancy
              </Typography>
            </Box>
          }
        >
          <Grid container pb={{ xs: 1 }} px={{ xs: 1.5 }} gap={{ md: "3%" }}>
            <OddsNumberTitleTwo />
            <OddsNumberTitleTwo />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
            <OddsOnlyTwo setBetId={setBetId} title={title} />
          </Grid>
        </CustomizedAccordions>
      </HomeLayout>
    </Box>
  );
};

export default Event;


    function BetResult({value, title}:{value:number, title:string}) {
      return (
        <Box display="flex" m={1} justifyContent={"space-between"}>
          <Typography color="text.secondary" fontSize={"0.8rem"}>
            {title}
          </Typography>
          <Typography color={value >= 0 ? "green" : "red"} fontSize={"0.8rem"}>
            {value}
          </Typography>
        </Box>
      );
    }
  