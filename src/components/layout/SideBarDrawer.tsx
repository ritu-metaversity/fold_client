import React, { useContext, useEffect, useMemo, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon, IconSmall, SidebarHeader } from "./styledComponents";
import { useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import { sportsTabList } from "../home/sportsTabList";
import { Box, Collapse, IconButton } from "@mui/material";
import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";

export const Drawers = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: any;
}) => {
  const [open, setOpen] = useState([true, false, false, false, false]);
  const [matchCollapse, setMatchCollapse] = useState<boolean[]>([]);
  const { isSignedIn, setModal, appData, activeEventList } =
    useContext(UserContext);

  const handleClick = (index: number) => {
    const openList = [...open];
    openList[index] = !open[index];
    setOpen(openList);
  };

  const handleClickSport = (index: number) => {
    const openList = [...matchCollapse];
    openList[index] = !matchCollapse[index];
    setMatchCollapse(openList);
  };

  useEffect(() => {
    if (activeEventList)
      setMatchCollapse(activeEventList.map((i: any) => (i ? false : false)));
  }, [activeEventList]);

  const openLoginModal = () => {
    if (setModal) {
      setModal({
        login: true,
      });
    }
  };

  const matchList = useMemo(
    () =>
      activeEventList?.map((sport, index) =>
        sport.matchList.map((match) => (
          <ListItem key={sport.sportId + "-" + match.matchId} disablePadding>
            <ListItemButton
              onClick={() =>
                isSignedIn
                  ? nav(`/sports/details/?match-id=${match.matchId}`)
                  : openLoginModal()
              }
              sx={{
                color: "text.secondary",
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                  },
                }}
                primary={`${match.matchName} ( ${match.date})`}
              />
            </ListItemButton>
          </ListItem>
        ))
      ) || [], // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeEventList, isSignedIn]
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
            <ListItemButton onClick={() => handleClick(0)}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                }}
                primary={"ALL SPORT"}
              />
              {open[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </SidebarHeader>
          <Collapse in={open[0]}>
            {activeEventList?.map((sport, index) => (
              <React.Fragment key={sport.sportId + index}>
                <ListItem
                  sx={{
                    p: 0,
                    gap: 0,
                    bgcolor: matchCollapse[index]
                      ? sportsTabList.find(
                          (sItem) => sItem.name === sport.sportName
                        )?.color
                      : "",
                  }}
                  key={sport.sportId + sport.totalMatch}
                  disablePadding
                >
                  <ListItemButton
                    onClick={() => handleClickSport(index)}
                    sx={{
                      color: matchCollapse[index] ? "white" : "text.secondary",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 30,
                      }}
                    >
                      {
                        <i
                          className={
                            sportsTabList.find(
                              (sItem) => sItem.name === sport.sportName
                            )?.iconClass
                          }
                          style={{
                            color: matchCollapse[index]
                              ? "white"
                              : sportsTabList.find(
                                  (sItem) => sItem.name === sport.sportName
                                )?.color,
                          }}
                        />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "0.8rem",
                        },
                      }}
                      primary={`${sport.sportName} ( ${sport.totalMatch} )`}
                    />
                    {matchCollapse[index] ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse in={matchCollapse[index]}>
                  {matchList[index]}
                </Collapse>
              </React.Fragment>
            ))}
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};
