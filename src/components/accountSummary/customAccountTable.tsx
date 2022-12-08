import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colorHex } from "../../constants";
import { styled } from "@mui/system";
import { Pagination, Typography } from "@mui/material";
import { isStringLiteral } from "typescript";

function createData(
  date: string,
  index: number,
  credit: number,
  debit: number,
  points: number,
  remarks: string,
) {
  return { date, index, credit, debit, points, remarks};
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.85rem",
    padding:4,
}));
const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 800,
}));

type columnIds = "date" | "index" | "credit" | "debit" | "points" | 'remarks';

interface ColumnsInterface  { 
    id: columnIds;
    label: string;
    minWidth?: number;
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0,"adf"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3,"adfasdf"),
  createData("Eclair", 262, 16.0, 24, 6.0,"adfadfasdf asd "),
  createData("Cupcake", 305, 3.7, 67, 4.3,"Adfadfasdf"),
  createData("Gingerbread", 356, 16.0, 49, 3.9,"adfdafads dsa f"),
];

const columns:ColumnsInterface [] = [
  {
    id: "date",
        label: "Date",
    minWidth:70,
  },
  {
    id: "index",
    label: "Sr no",
  },
  {
    id: "credit",
    label: "Credit",
  },
  {
    id: "debit",
    label: "Debit",
  },
  {
    id: "points",
    label: "Pts",
  },
  {
    id: "remarks",
    label: "Remarks",
  },
];
export default function AccountTable() {
  return (
      <>
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        minHeight: 400,
        color: "text.secondary",
        m: { lg: 1 },
        bgcolor: "transparent",
        width: { lg: "calc( 100% - 20px )" },
      }}
    >
      <Table
        sx={{ border: `1px solid ${colorHex.bg2} ` }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ bgcolor: colorHex.bg2 }}>
          <TableRow>{columns.map(({minWidth,label}) => <StyledTableHeaderCell sx={{minWidth}}>{label}</StyledTableHeaderCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index+row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                  {columns.map(({id}) => <StyledTableCell>{row[id]}</StyledTableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            
      <Pagination
        count={10}
        color="secondary"
        sx={{
          display: "inline-block",

          m: "auto",
          justifyContent: "center",
        }}
        showFirstButton
        showLastButton
      />
      </>
  );
}
