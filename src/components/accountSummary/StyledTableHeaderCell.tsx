import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.8rem",
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
  padding: 4,
  whiteSpace: "nowrap",
}));

export const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 800,
}));

export type columnIds =
  | "date"
  | "sno"
  | "credit"
  | "debit"
  | "pts"
  | "remark";

export interface ColumnsInterface<Type> {
  id: Type;
  label: string;
  minWidth?: number|string;
  align?: "left" | "right" | "center";
}

