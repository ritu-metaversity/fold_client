import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const DialogTitleStyledTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
}));
