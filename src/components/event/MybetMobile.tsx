import { ChevronLeft, ChevronRight, } from "@mui/icons-material";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import { colorHex } from "../../constants";
import CustomizedDialog2 from "./Dailog3withNoPadding";
import { getMyBets } from "./MyBet";
import { BetAlert, TitleStyled } from "./styledComponents";

interface Props {
  bets: {
    [x: string]: any[];
  };
}

const MybetMobile: FC<Props> = ({ bets }) => {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const betCount = useMemo(() => {
    let count = 0;
    Object.keys(bets).forEach(key => count += bets[key].length)
    return count;
  }, [bets])
  const handleClose = () => {
    setOpen(false);
  };

  const leftClick = () => {
    setCounter((c) => (c > 1 ? c - 1 : 0));
  };
  const rightClick = () => {
    setCounter((c) => (c + 1 < Object.keys(bets).length ? c + 1 : c));
  };
  if (!(Object.keys(bets)?.length > 0)) {
    return <></>;
  }
  console.log(Object.keys(bets));
  return (
    <>
      <BetAlert onClick={() => setOpen(true)}>{betCount}</BetAlert>
      <CustomizedDialog2 title="MY BETS" open={open} handleClose={handleClose}>
        <Box minHeight={"calc(100vh - 158px)"}>
          <TitleStyled>Matched Bets</TitleStyled>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            bgcolor={colorHex.bg3}
          >
            <IconButton sx={{ bgcolor: colorHex.bg2 }} onClick={leftClick}>
              <ChevronLeft fontSize="small" />
            </IconButton>
            <Tabs
              textColor="inherit"
              TabIndicatorProps={{sx:{backgroundColor: "white", color: "white"}}}
              sx={{ flex: 1, mt:-1 }}
              value={counter}
              onChange={(e, value) => {
                setCounter(value);
              }}
            >
              {Object.keys(bets).map((item) => (
                <Tab key={"mybet-tab" + item} sx={{mb:-0.5}} label={`${item} (${bets[item]?.length})`} />
              ))}
            </Tabs>
            <IconButton sx={{ bgcolor: colorHex.bg2 }} onClick={rightClick}>
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
          {getMyBets(bets[Object.keys(bets)[counter]])}
        </Box>
      </CustomizedDialog2>
    </>
  );
};

export default MybetMobile;
