import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { colorHex } from "../../utils/constants";
import { styled as muiStyled } from "@mui/material";

export const AmountInput = styled.input`
  width: calc(100% - 22px);
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
  -moz-appearance: textfield;
  @media (max-width: 1279px) {
    width: calc(100% - 2px);
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      display: block;
    }
    -moz-appearance: none;
  }
  z-index: 10;
  border: 0;
  padding: 10px;
  color: #fff;

  position: relative;
  margin: 1px;
  border-radius: 0px;

  &:focus-visible {
    outline: none;
  }
  background-color: ${colorHex.bg6};
`;

export const TitleStyled = styled(Typography)({
  fontWeight: 700,
  marginBlock: 8,
  textAlign: "left",
});

export const AccordianSummaryTitle = styled(Typography)({
  fontSize: "0.85rem",
  lineHeight: 1,
  fontWeight: 500,
});

export const AmountInputBGBack = styled.div`
  background-color: #72bbef;
  background-image: linear-gradient(#72bbef, #72bbef),
    linear-gradient(#72bbef, #72bbef), linear-gradient(#72bbef, #72bbef),
    linear-gradient(#000000bf, #000000bf);

  position: absolute;
  z-index: 1;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-repeat: no-repeat;
  background-size: 50% 50%, 50% 50%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;

  animation: rotation 5s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export const AmountInputBGLay = styled.div`
  background-color: #f994ba;
  background-image: linear-gradient(#f994ba, #f994ba),
    linear-gradient(#f994ba, #f994ba), linear-gradient(#f994ba, #f994ba),
    linear-gradient(#000000bf, #000000bf);

  position: absolute;
  z-index: 1;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-repeat: no-repeat;
  background-size: 50% 50%, 50% 50%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;

  animation: rotation 5s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export const BetAlert = muiStyled(Box)(({ theme }) => ({
  height: 50,
  width: 50,
  background: theme.palette.secondary.main,
  borderRadius: "50%",
  color: "white",
  textAlign: "center",
  verticalAlign: "center",
  fontSize: "1.5rem",
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200, 
  fontWeight: 700,
  margin: 5,
  [theme.breakpoints.up("lg")]: {
    display:"none"
  }
}));


export const GameHeader = styled(Box)`
  padding: 8px;
  color: white;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 1279px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;