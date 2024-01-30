import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Icon, IconSmall, SidebarHeader } from "./styledComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import { casinoService } from "../../utils/api/casino/service";
import { CasinoList } from "../casino/Casino";
import axios from "axios";
import SidebarSport from "./SidebarSport";
import CasinoGame from "../casino/game/CasinoGame";

const SideBarCasino = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) => {
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(true);
  const { isSignedIn, setModal, casinoId, appData } = useContext(UserContext);

  const { pathname } = useLocation();
  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setOpen((o) => !o);
  };
  const token = localStorage.getItem("token");

  const getCasinoList = useCallback(async () => {
    if (!isSignedIn) return;
    if (loading) return;
    setLoading(true);
    if (Number(casinoId) === 323334) {
      axios
        .get(
          "https://admin-api-banners-2.s3.ap-south-1.amazonaws.com/wolf.json"
        )
        .then((res) => setCasinoList(res.data.data));
    } else {
      setCasinoList([]);
    }
    // const { response } = await casinoService.getCasinoListByType(
    //   Number(casinoId)
    // );
    // if (response) {
    //   setCasinoList(response.data || []);
    // } else {
    //   setCasinoList([]);
    // }
    setLoading(false);
  }, [isSignedIn, casinoId]);

  useEffect(() => {
    getCasinoList();
  }, [getCasinoList]);

  const openLoginModal = () => {
    if (setModal) {
      setModal({
        login: true,
      });
    }
  };

  const matchList = useMemo(
    () =>
      casinoList.map((casino) => (
        <ListItem
          key={casino.gameId}
          sx={{
            bgcolor: pathname.includes(casino.gameId.toString())
              ? "primary.main"
              : "",
            height: 28,
          }}
          disablePadding
        >
          <ListItemButton
            onClick={() =>
              isSignedIn
                ? setId(casino.gameId)
                : // nav(`/livecasino/${casino.gameId}`)
                  openLoginModal()
            }
            sx={{
              height: 28,
              color: pathname.includes(casino.gameId.toString())
                ? "black"
                : "text.secondary",
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: { fontSize: "0.8rem" },
              }}
              primary={casino.gameName}
            />
          </ListItemButton>
        </ListItem>
      )) || [], // eslint-disable-next-line react-hooks/exhaustive-deps
    [casinoList, isSignedIn, pathname]
  );
  const nav = useNavigate();
  return (
    <Box // p={{ lg: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
        bgcolor: {
          xs: colorHex.bg3,
          lg: isSignedIn ? colorHex.bg3 : colorHex.bg6,
        },
      }}
    >
      {
        <Icon
          onClick={() => nav("/")}
          src={appData?.mobileLogo} // src="/assets/images/icon.png"
          alt="ico"
        />
      }
      {isSignedIn && (
        <Box display={"flex"} alignItems="center" px={1}>
          <IconSmall
            style={{
              marginLeft: 1,
            }}
            src={appData?.mobileLogo}
            alt="logo"
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              pt: 1,
              ml: "auto",
              display: {
                lg: "none",
              },
            }}
          >
            <Menu fontSize="large" />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          bgcolor: {
            lg: colorHex.bg7,
          },
          overflow: "auto",
          height: "100%",
          position: "relative",
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        <List
          sx={{
            p: 0,
            m: 0,
          }}
        >
          <SidebarHeader
            sx={{
              borderBottom: "1px solid " + colorHex.borderLine,
            }}
          >
            <ListItemButton
              onClick={() => {
                nav("/");
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                }}
                primary={"DASHBOARD"}
              />
            </ListItemButton>
          </SidebarHeader>
          <SidebarHeader
            sx={{
              borderBottom: "1px solid " + colorHex.borderLine,
            }}
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                }}
                primary={"ALL CASINO"}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          {open && matchList}
          <SidebarSport />
        </List>
      </Box>

      {id && (
        <CasinoGame
          type="aura"
          name={casinoList.find((i) => i.gameId === id)?.gameName}
          id={id}
          handleClose={() => setId(0)}
          desktopUrl={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
          mobileUrl={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        />
      )}
    </Box>
  );
};
export default SideBarCasino;
