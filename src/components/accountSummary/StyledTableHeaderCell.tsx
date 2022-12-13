import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";

function createData(
  date: string,
  index: number,
  credit: number,
  debit: number,
  points: number,
  remarks: string
) {
  return { date, index, credit, debit, points, remarks };
}
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
  | "index"
  | "credit"
  | "debit"
  | "points"
  | "remarks";

export interface ColumnsInterface<Type> {
  id: Type;
  label: string;
  minWidth?: number|string;
  align?: "left" | "right" | "center";
}
export const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "adf"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "adfasdf kjs"),
  createData("Eclair", 262, 16.0, 24, 6.0, "adfadfa adslkadj askdf alksdfj akdf adsf laksdjf alsdfk lasdksdf asd "),
  createData("Cupcake", 305, 3.7, 67, 4.3, "Adfadfasdf"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "adfdafads dsa f"),
];
