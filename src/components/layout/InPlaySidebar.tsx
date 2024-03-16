import React, { FC, useContext, useEffect, useState } from "react";
import { sportsResourses } from "../../utils/api/sport/resources";
import { sportServices } from "../../utils/api/sport/services";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MatchInterface } from "../home/match";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

const InPlaySidebar = () => {
  const [activeMatches, setActiveMatches] = useState<
    (MatchInterface & { sportId: string })[]
  >([]);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const { isSignedIn, setModal, appData, activeEventList } =
    useContext(UserContext);
  const openLoginModal = () => {
    if (setModal) {
      setModal({
        login: true,
      });
    }
  };

  const host = window.location.hostname;

  useEffect(() => {
    const getMatches = async () => {
      const { response } = await sportServices.allActiveEvent();
      if (response) {
        console.log(response);
        setActiveMatches(
          response.data.reduce(
            (accumalator: any, value: any) => [
              ...accumalator,
              ...value.matchList.map((i: MatchInterface) => ({
                ...i,
                sportId: value.sportid,
              })),
            ],
            []
          )
        );
      }
    };

    getMatches();
    return () => {};
  }, []);

  const handleClickSport = () => {
    setOpen((o) => !o);
  };

  return (
    <div>
      <ListItem
        sx={{
          p: 0,
          gap: 0,
          bgcolor: open ? "gray" : "",
        }}
        disablePadding
      >
        <ListItemButton
          onClick={handleClickSport}
          sx={{
            color: open ? "white" : "text.secondary",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 30,
            }}
          >
            {<AccessAlarmsIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "0.8rem",
              },
            }}
            primary={`In Play ( ${activeMatches.length} )`}
          />
          {open ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        {activeMatches.map((match) => 
        {
          if(host.includes("onlysession.in")){
            if(match.sportId != "4") return null
          }
          return(
          <ListItem key={match.matchId} disablePadding>
            <ListItemButton
              onClick={() =>
                isSignedIn
                  ? nav(
                      `/sports/details/?match-id=${match.matchId}&sport-id=${match.sportId}`
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
                primary={`${match.matchName} ( ${match.openDate})`}
              />
            </ListItemButton>
          </ListItem>
        )}
        )}
      </Collapse>
    </div>
  );
};

export default InPlaySidebar;
