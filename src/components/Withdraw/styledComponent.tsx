import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { colorHex } from "../../utils/constants";

export const WithdrawInput = styled(TextField)(({ theme }) => ({
  background: colorHex.bg3,
  outline: "none",
  [theme.breakpoints.up("xs")]:{
    width: "100%"
  },
  [theme.breakpoints.up("lg")]: {
    width:156
  },
  // width: { xs: "100%", lg: 156 },
  "& fieldset": {
    border: "none",
    },
  borderRadius: 8
}));
