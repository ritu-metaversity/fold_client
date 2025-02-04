import { Close } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubtractIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserContext } from "../../../App";
import { colorHex } from "../../../utils/constants";
import {
  AmountInput,
  AmountInputBGBack,
  AmountInputBGLay,
  TitleStyled,
} from "../styledComponents";
import { eventServices } from "../../../utils/api/event/services";
import Loading from "../../layout/loading";
import { BetDetailsInterface } from "../types";
import moment from "moment";

interface Props {
  getBets: () => void;
  getPnl: () => void;
  getFancyPnl: () => void;
  betId: BetDetailsInterface | null;
  setBetId: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  matchId: number | string;
}

const gridProps = {
  item: true,
  xs: 2.2,
  my: 0.5,
  color: "text.primary",
  borderRadius: 1,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  bgcolor: colorHex.gr2,
  height: "40px",
};
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
export const BetSlip: FC<Props> = ({
  getBets,
  betId,
  setBetId,
  matchId,
  getPnl,
  getFancyPnl,
}) => {
  const { stakes, getBalanceData, userIp, activeEventList } =
    useContext(UserContext);
  const matches = useMediaQuery("(min-width: 1280px)");
  const [loading, setLoading] = useState(false);

  // const deviceInfo = {
  //   userAgent: window.navigator.userAgent,
  //   browser: "",
  //   device: window.navigator.mediaDevices,
  //   deviceType: getDeviceType(),
  //   os: window.navigator.platform,
  //   os_version: "windows-10",
  //   browser_version: "108.0.0.0",
  //   orientation: "",
  // };
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const data = {
      ...betId,
      placeTime: moment(betId?.placeTime).format("YYYY-MM-DD HH:mm:ss.SSS"),
      matchId,
      userIp,
      deviceInfo: {
        userAgent: window.navigator.userAgent,
        browser: "Chrome",
        device: "Macintosh",
        deviceType: getDeviceType(),
        os: "Windows",
        os_version: "windows-10",
        browser_version: "108.0.0.0",
        orientation: "landscape",
      },
    };

    const { response } = await eventServices.bet(data);
    setBetId(null);
    if (response) {
      getBets();
      getBalanceData();
      setTimeout(() => {
        if (data.isFancy) {
          getFancyPnl();
        } else {
          getPnl();
        }
      }, 2000);
    }
    setLoading(false);
  };

  const getMatchName = useMemo(
    () =>
      activeEventList
        ?.reduce((acc: any[], current) => [...acc, ...current.matchList], [])
        ?.find((item: any) => item.matchId == matchId)?.matchName || undefined,
    [matchId, activeEventList]
  );

  useEffect(() => {
    let newTimer: any;
    newTimer = setTimeout(() => {
      setBetId(null);
    }, 15000);
    return () => {
      clearTimeout(newTimer);
    };
  }, [betId?.selectionId]);

  // if (loading)
  //   return (
  //     <Box height={400} position="absolute" width={"100%"}>
  //       <Loading />
  //     </Box>
  //   );

  if (!betId) return <></>;

  return (
    <Box textAlign={"left"} height="max-content" position="relative">
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 20 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
        >
          <Loading />
        </Box>
      )}
      {matches && <TitleStyled>Bet Slip</TitleStyled>}
      <Box p={0.5}>
        <Box
          display="flex"
          fontSize={{ xs: "0.9rem", lg: "0.8rem" }}
          justifyContent={"space-between"}
        >
          <Typography fontSize={{ xs: "0.9rem", lg: "0.8rem" }}>
            {<>{getMatchName}</>}
          </Typography>
          {matches && (
            <Close
              sx={{ cursor: "pointer" }}
              fontSize="small"
              onClick={() => setBetId(null)}
            />
          )}
        </Box>
        <Typography fontSize={{ xs: "0.9rem", lg: "0.8rem" }}>
          {betId.marketName}
        </Typography>
        <Box
          display="flex"
          my="0.8rem"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography
            fontSize={{ xs: "0.9rem", lg: "0.8rem" }}
            fontWeight={700}
            color="primary.main"
          >
            {betId.name}
          </Typography>
          {betId.isFancy || betId.marketName === "Bookmaker" ? (
            <Typography
              fontSize={{ xs: "0.9rem", lg: "0.8rem" }}
              fontWeight={700}
              color="primary.main"
            >
              {betId.odds}
            </Typography>
          ) : matches ? (
            <TextField
              type={"number"}
              size="small"
              value={betId.odds}
              // disabled

              InputProps={{ readOnly: true, style: { fontSize: "0.75rem" } }}
              sx={{ width: 80 }}
            />
          ) : (
            <Box display={"flex"} alignItems="center" bgcolor={colorHex.bg6}>
              <IconButton sx={{ bgcolor: "error.main", borderRadius: 0 }}>
                <SubtractIcon fontSize="small" />
              </IconButton>
              <Typography px={1}>{betId.odds} </Typography>
              <IconButton sx={{ bgcolor: "secondary.light", borderRadius: 0 }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        borderTop={`1px solid ${colorHex.borderLine} `}
        py={1}
      >
        <Box
          position="relative"
          width="50%"
          height="min-content"
          overflow="hidden"
        >
          {betId.isBack ? <AmountInputBGBack /> : <AmountInputBGLay />}
          <AmountInput
            // type="number"
            min={0}
            value={Number(betId?.stake) || ""}
            onChange={(e) => {
              e.preventDefault();
              setBetId({ ...betId, stake: Number(e.target.value) });
            }}
            placeholder="Amount"
          />
        </Box>
        {Boolean(betId.stake) && (
          <Box ml="auto" mr={1}>
            <Typography
              color="text.primary"
              fontSize={"0.75rem"}
              textAlign="right"
            >
              Profit:
            </Typography>
            <Typography textAlign="right" fontSize={"0.9rem"}>
              {betId.isBack
                ? betId.isFancy
                  ? (betId.stake * betId.priceValue) / 100
                  : (betId.marketName === "Bookmaker"
                      ? (betId.odds * betId.stake) / 100
                      : (betId.odds - 1) * betId.stake
                    ).toFixed(2)
                : betId.stake}
            </Typography>
          </Box>
        )}
      </Box>
      <Grid container rowGap={"5px"} gap={"2%"}>
        {Object.keys(stakes).map((key) => (
          <Grid {...gridProps} key={key + stakes[key]}>
            <Button
              fullWidth
              color="inherit"
              sx={{ color: "white" }}
              onClick={() => setBetId({ ...betId, stake: stakes[key] })}
            >
              {stakes[key]}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        color="secondary"
        variant="contained"
        disabled={loading}
        sx={{ my: 2, color: betId?.stake ? "white" : "text.secondary" }}
        fullWidth
        onClick={handleSubmit}
      >
        {" "}
        Place Bet{" "}
      </Button>
    </Box>
  );
};
