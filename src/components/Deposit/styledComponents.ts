import { Box, Button, styled } from "@mui/material";
import emotionStyled from "@emotion/styled";
import { style } from "@mui/system";
import { colorHex } from "../../utils/constants";

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

export const CardImg = emotionStyled.img`
  width: 100px;
  aspect-ratio: 1/1;
`;

export const CardContainerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  "& .selected": {
    borderColor: theme.palette.primary.main,
  },
  width: "max-content",
  maxWidth: "100%",
  flexWrap: "wrap",
  padding: "15px",
  justifyContent: "space-evenly",
  gap: "15px",
  background: colorHex.bg2,
  borderRadius: "12px",
  margin: "auto",
}));

export const ImageUploadContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  width: "100%",
  cursor: "pointer",
  height: 200,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));
export const CardContainer = emotionStyled.div`
  aspect-ratio:1;
  width: 150px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid gray;
  background: ${colorHex.bg3}
`;

export const StyledAmountInput = emotionStyled.input`
  background:transparent;
  border: none;
  outline: none;
  color: white;
  width: calc(100% - 50px);
`;
