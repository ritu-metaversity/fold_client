import React, { useContext, useMemo, useState } from "react";
import { SidebarHeader } from "./styledComponents";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InPlaySidebar from "./InPlaySidebar";
import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import { sportsTabList } from "../home/sportsTabList";
import { useNavigate } from "react-router-dom";

const SidebarSport = () => {
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
  const openLoginModal = () => {
    if (setModal) {
      setModal({
        login: true,
      });
    }
  };
  const nav = useNavigate();

  const matchList = useMemo(
    () =>
      activeEventList?.map((sport, index) =>
        sport.matchList.map((match) => (
          <ListItem key={sport.sportId + "-" + match.matchId} disablePadding>
            <ListItemButton
              onClick={() =>
                isSignedIn
                  ? nav(
                    `/sports/details/?match-id=${match.matchId}&sport-id=${sport.sportId}`
                  )
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

  const host = window.location.hostname;

  return (
    <>
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
        <InPlaySidebar />
        {activeEventList?.map((sport, index) => {
          if(host.includes("onlycricket.co.in")){
            if(sport?.sportId !== 4) return null
          }
          return (
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
              <Collapse in={matchCollapse[index]}>{matchList[index]}</Collapse>
            </React.Fragment>
          )
        }
        )}
      </Collapse>
    </>
  );
};

export default SidebarSport;
