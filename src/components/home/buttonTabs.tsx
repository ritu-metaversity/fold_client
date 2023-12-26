import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import { UserContext } from "../../App";
import { ButtonTabStyledButton } from "./styledComponents";

export const getLinksAndLabels = (alloc: AllocatedCasino) => [
  ...(alloc.QTech?.active
    ? [
        {
          label: "Lottery",
          link: "/lottery",
          require: true,
        },
      ]
    : []),
  ...(alloc.SportBook?.active
    ? [
        {
          label: "SportsBook1",
          link: "/cumming",
        },
      ]
    : []),
  {
    label: "Exchange",
    link: "/",
  },
  ...(alloc.Aura?.active || alloc.QTech?.active || alloc["Super Nova"]?.active
    ? [
        {
          label: "Live Casino",
          link: "/casino",
          require: true,
        },
      ]
    : []),
  // {
  //   label: "Virtual Casino",
  //   link: "/virtual-casino",
  // },
  ...(alloc.QTech?.active
    ? [
        {
          label: "Slots",
          link: "/slot",
          require: true,
        },
        {
          label: "Fantasy Game",
          link: "/fantasy",
          require: true,
        },
      ]
    : []),
];

export const LinksAndLabels = [
  {
    label: "Lottery",
    link: "/lottery",
    require: true,
  },
  {
    label: "SportsBook1",
    link: "/cumming",
  },
  {
    label: "Exchange",
    link: "/",
  },
  {
    label: "Live Casino",
    link: "/casino",
    require: true,
  },
  // {
  //   label: "Virtual Casino",
  //   link: "/virtual-casino",
  // },
  {
    label: "Slots",
    link: "/slot",
    require: true,
  },
  {
    label: "Fantasy Game",
    link: "/fantasy",
    require: true,
  },
];

export function ButtonTabs() {
  const [current, setCurrent] = useState("/");
  const { isSignedIn, setModal, allocatedCasino } = useContext(UserContext);
  const nav = useNavigate();
  const linksAndLabel = isSignedIn
    ? getLinksAndLabels(allocatedCasino)
    : LinksAndLabels;
  return (
    <Box
      width={"calc(100% - 8px)"}
      className="button_tabs_container"
      overflow={"auto"}
      m="auto"
    >
      <ButtonGroup
        sx={{
          display: {
            lg: "none",
          },
          minWidth: "100%",
          fontSize: "0.75rem",
        }}
        color="secondary"
        variant="contained"
      >
        {linksAndLabel.map((item) => (
          <ButtonTabStyledButton
            onClick={() => {
              if (isSignedIn) {
                nav(item.link);
                setCurrent(item.link);
              } else if (setModal) {
                setModal({ login: true });
              }
            }}
            color={current === item.link ? "primary" : undefined}
          >
            {item.label}
          </ButtonTabStyledButton>
        ))}
        {/* <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/casino");
              setCurrent("live-casino");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "live-casino" ? selectedSx : unSelectedSx}
        >
          Live Casino
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/virtual-casino");
              setCurrent("virtual-casino");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "virtual-casino" ? selectedSx : unSelectedSx}
        >
          Virtual Casino
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/slot");
              setCurrent("slot");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "slot" ? selectedSx : unSelectedSx}
        >
          Slot
        </Button>
        <Button
          onClick={() => {
            if (isSignedIn) {
              nav("/fantasy");
              setCurrent("fantasy");
            } else if (setModal) {
              setModal({ login: true });
            }
          }}
          sx={current === "fantasy" ? selectedSx : unSelectedSx}
        >
          Fantasy Games
        </Button> */}
        {/* <Button sx={unSelectedSx}>Slot</Button>
        <Button sx={unSelectedSx}>Fantasy Games</Button> */}
      </ButtonGroup>
    </Box>
  );
}
