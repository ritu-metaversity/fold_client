import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { colorHex } from "../../utils/constants";

export const WithdrawInput = styled(TextField)(({ theme }) => ({
  background: colorHex.bg3,
  outline: "none",
  "& fieldset": {
    border: "none",
    },
  borderRadius: 8
}));
