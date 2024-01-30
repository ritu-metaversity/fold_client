import {
  styled,
  Tab,
  Tabs,
  tabClasses,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import HomeLayout from "../layout/homeLayout";
import { CasinoIcon, StyledGameThumb } from "./styledComponent";
import { colorHex } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { casinoService } from "../../utils/api/casino/service";
import { UserContext } from "../../App";
import axios from "axios";
import CasinoGame from "./game/CasinoGame";

const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: "20px",
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

export interface CasinoList {
  gameId: number;
  gameCode: string;
  gameName: string;
  imageUrl: string;
}

export interface SuperNowaGameInterface {
  name: string;
  code: string;
  thumb: string;
  providerName: string;
  providerCode: string;
}

const Casino = () => {
  const [value, setValue] = useState("323334");
  const [casinoTypes, setCasinoTypes] = useState<
    {
      id: number;
      logo: string;
      name: string;
    }[]
  >([]);
  const [open, setOpen] = useState(0);
  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);
  const token = localStorage.getItem("token");

  const nav = useNavigate();
  const { isSignedIn, setCasinoId } = useContext(UserContext);
  const getCasinoList = async () => {
    if (!isSignedIn) {
      nav("/");
      return;
    }
    if (Number(value) === 323334) {
      axios
        .get(
          "https://admin-api-banners-2.s3.ap-south-1.amazonaws.com/wolf.json"
        )
        .then((res) => setCasinoList(res.data.data));
    } else {
      setCasinoList([]);
    }
    // const { response } = await casinoService.getCasinoListByType(Number(value));
    // if (response) {
    //   setCasinoList(response.data || []);
    // } else {
    //   setCasinoList([]);
    // }
  };

  // const getSuperNowaGameList = async () => {
  //   const { response } = await supernowaServices.gameLists({
  //     providerCode: "SN",
  //   });

  //   if (
  //     response &&
  //     response?.data &&
  //     response?.data?.games &&
  //     response?.data?.games.length
  //   ) {
  //     const { games } = response?.data;
  //     setSupernowaGamesList(games);
  //   }
  // };

  // const authHandler = async (item: SuperNowaGameInterface) => {
  //   setOpen(1);

  //   const { response } = await supernowaServices.authentication({
  //     game: {
  //       gameCode: item?.code,
  //       providerCode: item?.providerCode,
  //     },
  //     timestamp: new Date().getTime(),
  //     user: {
  //       currency: "INR",
  //       backUrl: "http://maggibook.com",
  //     },
  //   });

  //   if (response && response?.data && response?.data?.launchURL) {
  //     const { launchURL } = response?.data;
  //     setGameLaunchURL(launchURL);
  //   }
  // };

  useEffect(() => {
    getCasinoList();
  }, [value, isSignedIn]);

  useEffect(() => {
    // getSuperNowaGameList();

    const getCasinoTypes = async () => {
      if (!isSignedIn) {
        nav("/");
        return;
      }
      const { response } = await casinoService.getCasinoTypes();
      if (response) {
        setCasinoTypes(response?.data || []);
        if (response.data[0]) {
          setValue(response.data[0].id);
          getCasinoList();
        }
      }
    };
    getCasinoTypes();
    return () => {};
  }, []);

  const matches = useMediaQuery("(max-width: 1279px)");

  return (
    <HomeLayout>
      {casinoTypes?.length > 0 && (
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
            top: matches ? 50 : 80,
            paddingY: "0.8rem",
            backgroundColor: colorHex.bg6,
          }}
          value={value}
          onChange={(e, value) => {
            setValue(value);
            if (setCasinoId) setCasinoId(value);
          }}
        >
          {casinoTypes.map((item) => (
            <StyledTab
              icon={<CasinoIcon src={item.logo} />}
              iconPosition="start"
              value={item.id}
              label={item.name}
            />
          ))}
          {/* <StyledTab
            icon={
              <CasinoIcon
                src={
                  "https://wver.sprintstaticdata.com/v14/static/front/img/icons/26.png"
                }
              />
            }
            iconPosition="start"
            value={"Games"} // change into the nunber once this is dynamic
            label={"Games"}
          /> */}
        </Tabs>
      )}
      <Box bgcolor={colorHex.bg1}>
        <Box m={"10px"} display={"flex"} flexWrap="wrap" gap={"10px"}>
          {!(casinoList?.length > 0) && (
            <Typography
              textAlign={"center"}
              sx={{ verticalAlign: "center" }}
              flex={1}
            >
              NO Casino Found
            </Typography>
          )}
          {casinoList.map((item) => (
            <Box
              width={{
                xs: "calc(50% - 10px)",
                sm: "calc(50% - 10px)",
                md: "calc(25% - 10px)",
                lg: "calc(20% - 10px)",
              }}
              m="auto"
            >
              <StyledGameThumb
                onClick={() => setOpen(item.gameId)}
                src={item.imageUrl}
                alt="thumb"
              />
            </Box>
          ))}
          {/* {supernowaGamesList.map((item) => (
            <Box
              width={{
                xs: "calc(50% - 10px)",
                sm: "calc(50% - 10px)",
                md: "calc(25% - 10px)",
                lg: "calc(20% - 10px)",
              }}
              m="auto"
            >
              <StyledGameThumb
                onClick={() => authHandler(item)}
                src={item.thumb}
                alt="thumb"
              />
            </Box>
          ))} */}
        </Box>
      </Box>
      {!!open && (
        <CasinoGame
          type="aura"
          name={casinoList.find((i) => i.gameId === open)?.gameName}
          id={open}
          handleClose={() => setOpen(0)}
          desktopUrl={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${open}`}
          mobileUrl={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${open}`}
        />
      )}
    </HomeLayout>
  );
};
export default Casino;
