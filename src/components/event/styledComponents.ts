import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { colorHex } from "../../constants";

export const AmountInput = styled.input`
  width: calc(100% - 22px);
  z-index: 10;
  border: 0;
  padding: 10px;
  color: #fff;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
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
