import { Typography, styled } from "@mui/material";
import { Box } from "@mui/system";

export const Title = styled(Typography)(({ theme }) => ({
  // color: "#AAAFB4",
  fontWeight: 900,
  textAlign: "left",
  padding: 2,
  width: "100%",

  color: "white",
  backgroundColor: theme.palette.tertiary.main,
}));

export const BoxWithTitleBox = styled(Box)({
  backgroundColor: "#17191C",
  padding: 5,
});
