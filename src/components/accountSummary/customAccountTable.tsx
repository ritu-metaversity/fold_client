import { StatementPopUp } from "./StatementPopUp";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";

import { colorHex } from "../../utils/constants";
import { Breakpoint, Theme, useMediaQuery, useTheme } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  StyledTableHeaderCell,
  StyledTableCell,
  ColumnsInterface,
} from "./StyledTableHeaderCell";
import CustomizedDialog2 from "../common/Dailog2";
import { AccountStatementFilter } from ".";

type BreakpointOrNull = Breakpoint | null;

export const useWidth = (): Breakpoint => {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys];
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return output != null && matches ? key : output;
    }, "xs") ?? "xs"
  );
};

interface Props {
  columns: ColumnsInterface<any>[];
  rows: any[];
  searchFilters: AccountStatementFilter;
  setSearchFilters: React.Dispatch<
    React.SetStateAction<AccountStatementFilter>
  >;
}

export default function AccountTable({
  searchFilters,
  setSearchFilters,
  columns,
  rows,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRowClick = () => {
    setOpen(true);
  };
  const breakpoints = useWidth();
  return (
    <>
      <CustomizedDialog2
        maxWidth={breakpoints}
        open={open}
        handleClose={handleClose}
        title=" Result"
      >
        <StatementPopUp />
      </CustomizedDialog2>
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
                onClick={handleRowClick}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map(({ id, align }) => (
                  <StyledTableCell align={align}>{row[id]}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={searchFilters.totalPages}
        siblingCount={0}
        page={searchFilters.index + 1}
        color="secondary"
        onChange={(e, page) => {
          setSearchFilters({ ...searchFilters, index: page - 1 });
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: KeyboardDoubleArrowLeftIcon,
              last: KeyboardDoubleArrowRightIcon,
            }}
            {...item}
          />
        )}
        sx={{
          display: "inline-block",
          maxWidth: "100%",
          m: "auto",
          justifyContent: "center",
        }}
        showFirstButton
        showLastButton
      />
    </>
  );
}
