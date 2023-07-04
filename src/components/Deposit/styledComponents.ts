import { Box, Button, styled } from "@mui/material";
import emotionStyled from "@emotion/styled";
import { colorHex } from "../../utils/constants";



export const ImageContainer = emotionStyled.div`
  max-width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  overflow: hidden;
`;

export const ZoomingImage = emotionStyled.img`
  max-width: 100%;
  max-height: 100%;
  // aspect-ratio: 1;
  // margin: auto;
`;

export const ImageThumb = emotionStyled.img`
  max-width: 40px;
  max-height: 40px;
`;


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
  width: 50%;

  aspect-ratio: 1/1;
`;

export const CardContainerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  "& .selected": {
    borderColor: theme.palette.primary.main,
  },

  // width: "max-content",
  // [theme.breakpoints.down("sm")]: {
  width: "100%",
  // },
  maxWidth: "100%",
  flexWrap: "wrap",
  padding: "0.5em",
  justifyContent: "space-evenly",
  gap: "0.5em",
  background: colorHex.bg2,
  borderRadius: "12px",
  margin: "auto",
}));

export const CardContainer = emotionStyled.div`
  aspect-ratio:1;

  width: 150px;
  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 580px) {
    width: 30%;
  }
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid gray;
  background: ${colorHex.bg3}

`;
export const ImageUploadContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  width: "100%",
  background: colorHex.bg2,
  cursor: "pointer",
  height: 200,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

export const PaymentDetailContainer = emotionStyled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid gray;
  background: ${colorHex.bg2};
  margin-block: 16px;

  padding: 16px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const SpacedBetween = emotionStyled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 580px) {

    font-size: 0.8rem;
  } 
  
  `;

export const QrImg = emotionStyled.img`
width: 100%;
aspect-ratio: 1/1;
margin: auto;
max-width: 200px;
`;

export const StyledAmountInput = emotionStyled.input`
  background:transparent;
  border: none;
  outline: none;
  color: white;
  width: calc(100% - 50px);
`;
