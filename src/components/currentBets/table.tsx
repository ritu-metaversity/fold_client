import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colorHex } from "../../constants";
import {
  Pagination,
  PaginationItem,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { ColumnsInterface, StyledTableCell, StyledTableHeaderCell } from "../accountSummary/StyledTableHeaderCell";




interface Props {
  columns: ColumnsInterface<any>[];
  rows: any[];
}
export default function CurrentBetTable({ columns, rows }: Props) {
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
            <TableRow
              sx={{
                width: "100%",
              }}
            >
              {columns.map(({ minWidth, label, align }) => (
                <StyledTableHeaderCell align={align} sx={{ minWidth }}>
                  {label}
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.index + row.date}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderLeft: ` 5px solid  ${
                    row.type === "back" ? colorHex.back[1] : row.type==="lay"? colorHex.lay[1]:"none"
                  }`,
                }}
              >
                {columns.map(({ id, align }) => (
                  <StyledTableCell align={align}>{row[id]}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
              </Table>
              
      </TableContainer>
    </>
  );
}
