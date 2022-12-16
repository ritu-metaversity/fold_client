import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { colorHex } from "../../constants";

export const CurrentBetCategoryTabsContainer = styled(Grid)({
  backgroundColor: colorHex.bg3,
  display: "flex",
  justifyContent: "center",
  padding: "10px 0",
  marginBlock: "10px",
  alignItems: "center",
});

export const CategoryTabs = styled(Typography)`
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 0.8rem;
`;