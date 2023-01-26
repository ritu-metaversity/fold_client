import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { colorHex } from "../../utils/constants";

export const WithdrawInput = styled(TextField)(({ theme }) => ({
  background: colorHex.bg3,
  outline: "none",
  display: "block",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: 167,
  },
  // width: { xs: "100%", lg: 156 },

  "& .MuiSelect-select ": {
    fontSize: "0.8rem",
  },
  "& input": {
    fontSize: "0.8rem",
    fontWeight: 500,
  },
  "& fieldset": {
    border: "none",
  },
  borderRadius: 8,
}));
