import styled from "@mui/system/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Title = styled(Typography)(({ theme }) => ({
  backgroundColor: "#3c444b",
  color: "#AAAFB4",
  fontWeight: 900,
  textAlign: "left",
  padding: 2,
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    backgroundColor: "#03b37f",
    color: "white",
  },
}));

export const BoxWithTitleBox = styled(Box)({
  backgroundColor: "#17191C",
  padding: 5,
});
