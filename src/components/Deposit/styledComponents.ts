import { Button, styled } from "@mui/material";
import emotionStyled from "@emotion/styled";
import { style } from "@mui/system";

export const StyledButtonSmall = styled(Button)(({ theme }) => ({
  boxShadow: "0 0 8px #16191C !important",
  color: theme.palette.text.primary,
  fontWeight: 700,
  marginRight: 5,
  marginBottom: 5,
  "&:hover": {
    backgroundColor: "transparent !important",
    opacity: 0.8,
  },
}));

export const StyledAmountInput = emotionStyled.input`
  background:transparent;
  border: none;
  outline: none;
  color: white;
  width: calc(100% - 50px);
`;
