import styled from "@emotion/styled"
import {
  Button,
  Tab,
  Theme,
  tabClasses,
  styled as muiStyled,
} from "@mui/material";
import { colorHex } from "../../utils/constants";

export const HeroImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4.27753303965;
  overflow: hidden;
  gap: 8px;
  display: flex;
`;

export const HeroImageContainerHalf = styled.div`
  width: 100%;
  aspect-ratio: 4;
  overflow: hidden;
  gap: 8px;
  display: flex;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const HeroImageHalf = styled.img`
  width: 50% !important;
  border-radius: 8px;
  height: 100%;
`;

export const WhiteForNull = styled.div`
  padding: 1px 8px;
  margin: auto;
  background-color: white;
  color: white;
`;

export const OddButton = styled(Button)`
  padding: 2px;
  ${({ theme }: { theme: Theme }) => theme.breakpoints.up("lg")} {
    padding: 0;
  }
  color: #000;
  font-weight: 700;
`;

export const TabStyled = muiStyled(Tab)(({ theme }) => ({
  [`& .${tabClasses.iconWrapper}`]: {
    marginBottom: "0rem",
    fontSize: "1rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.3rem",
    },
  },
  py: 0,
  // marginBlock: theme.spacing(-2.5),
  [theme.breakpoints.down("lg")]: {
    padding: "0px 7px",
    fontSize: "0.75rem",
    minHeight: 44,
  },
  [theme.breakpoints.up("lg")]: {
    marginBlock: theme.spacing(-2.5),
  },
  borderLeft: "0.5px solid rgb(60,68,75)",
}));
export const ButtonTabStyledButton = muiStyled(Button)(({ color, theme }) => ({
  background: color === "primary" ? "#444" : colorHex.bg2,

  borderColor: "#999 !important",
  color: "#ddd",
  // width: "max-content !important",
  minWidth: "unset !important",
  display: "block",
  flex: 1,
  fontSize: "0.75rem",
  lineHeight: 1,
  minHeight: 44,
  padding: "7px 7px",
}));