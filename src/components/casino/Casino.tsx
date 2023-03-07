import {
  styled,
  Tab,
  Tabs,
  tabClasses,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../layout/homeLayout";
import { CasinoIcon, StyledGameThumb } from "./styledComponent";
import { colorHex } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { casinoService } from "../../utils/api/casino/service";
import { UserContext } from "../../App";

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

export interface CasinoList {
  gameId: number;
  gameCode: string;
  gameName: string;
  imageUrl: string;
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

  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);

  const nav = useNavigate();
  const { isSignedIn, setCasinoId } = useContext(UserContext);
  const getCasinoList = async () => {
    console.log("in min");
    if (!isSignedIn) {
      nav("/");
      return;
    }
    const { response } = await casinoService.getCasinoListByType(Number(value));
    if (response) {
      setCasinoList(response.data || []);
    } else {
      setCasinoList([]);
    }
  };

  useEffect(() => {
    getCasinoList();
  }, [value, isSignedIn]);

  useEffect(() => {
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
        /> */}
        </Tabs>
      )}
      <Box bgcolor={colorHex.bg1}>
        <Box m={"10px"} display={"flex"} flexWrap="wrap" gap={"10px"}>
          {!(casinoList?.length > 0) && (
            <Typography
              textAlign={"center"}
              sx={{ verticalAlign: "center" }}
              // height={"50vh"}
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
                // xl: "calc(20% - 10px)",
              }}
              m="auto"
            >
              <Link to={"/casino/" + item.gameId}>
                <StyledGameThumb src={item.imageUrl} alt="thumb" />{" "}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </HomeLayout>
  );
};
export default Casino;
