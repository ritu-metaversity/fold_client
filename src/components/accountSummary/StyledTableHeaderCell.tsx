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
  fontSize: "0.85rem",
  padding: 4,
  whiteSpace: "nowrap",
}));
export const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 800,
}));
type columnIds = "date" | "index" | "credit" | "debit" | "points" | "remarks";

export interface ColumnsInterface {
  id: columnIds;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}
export const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "adf"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "adfasdf kjs"),
  createData("Eclair", 262, 16.0, 24, 6.0, "adfadfasdf asd "),
  createData("Cupcake", 305, 3.7, 67, 4.3, "Adfadfasdf"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "adfdafads dsa f"),
];
