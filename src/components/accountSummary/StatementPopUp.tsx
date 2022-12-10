import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import React from "react";
import {
  StyledTableCell,
  StyledTableHeaderCell,
} from "./StyledTableHeaderCell";
import { colorHex } from "../../constants";

type columnsIdType =
  | "nation"
  | "rate"
  | "bhav"
  | "amount"
  | "win"
  | "date"
  | "ip"
  | "browser";
interface ResultColumnsInterface {
  id: columnsIdType;
  label: string;
  align?: "right" | "left";
  minWidth?: number;
}
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    maxWidth: 200,
    textAlign: "center",
  },
}));

const resultColumns: ResultColumnsInterface[] = [
  {
    id: "nation",
    label: "Nation",
    minWidth: 70,
  },
  {
    id: "rate",
    label: " Rate",
    minWidth: 70,
    align: "right",
  },
  {
    id: "bhav",
    label: "Bhav",
    align: "right",
    minWidth: 70,
  },
  {
    id: "amount",
    label: "Amount",
    align: "right",
    minWidth: 70,
  },
  {
    id: "win",
    label: "Win",
    align: "right",
    minWidth: 70,
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "ip",
    label: "Ip Address",
  },
  {
    id: "browser",
    label: "Browser Details",
  },
];
const ResultRows = [
  {
    nation: (
      <label>
        <input type="checkbox" />
        1st inn 10 over odd run bhav PAK(PAK vs ENG)adv - ODD
      </label>
    ),
    rate: 0.34,
    bhav: 0.34,
    amount: 0.43,
    win: 0,
    date: "07/12/2022 17:14:59",
    ip: "115.246.121.179",
    browser: (
      <BootstrapTooltip title="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36">
        <Box>Detail</Box>
      </BootstrapTooltip>
    ),
  },
  {
    nation: (
      <label>
        <input type="checkbox" />
        1st inn 10 over odd run bhav PAK(PAK vs ENG)adv - ODD
      </label>
    ),
    rate: 0.34,
    bhav: 0.34,
    amount: 0.43,
    win: 0,
    date: "07/12/2022 17:14:59",
    ip: "115.246.121.179",
    browser: (
      <BootstrapTooltip title="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36">
        <Box>Detail</Box>
      </BootstrapTooltip>
    ),
  },
];

export function StatementPopUp() {
  return (
    <Box fontSize={"0.75rem"}>
      <Box>{`Cricket -> Test Matches -> Pakistan v England -> oddeven`}</Box>
      <Box display={"flex"} justifyContent="space-between">
        <span>Winner: 1</span>
        <span>Game Time: 09/12/2022 10:30:00</span>
      </Box>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {["all", "back", "lay", "deleted"].map((value) => (
          <FormControlLabel
            slotProps={{
              typography: {
                textTransform: "capitalize",
                fontSize: "0.8rem",
              },
            }}
            value={value}
            control={
              <Radio
                sx={{
                  fontSize: "0.8rem",
                }}
              />
            }
            label={value}
          />
        ))}
      </RadioGroup>
      <Box display="flex" gap={1}>
        <Typography component={"span"} fontSize="inherit">
          Total Bets:
        </Typography>
        <Typography component={"span"} fontSize="inherit" color="#39ff39">
          1
        </Typography>
        <Typography component={"span"} fontSize="inherit">
          Total Wins:
        </Typography>
        <Typography component={"span"} fontSize="inherit" color="#39ff39">
          98
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          color: "text.secondary",
          m: {
            lg: 1,
          },
          bgcolor: "transparent",
          width: {
            lg: "calc( 100% - 20px )",
          },
        }}
      >
        <Table
          sx={{
            border: `1px solid ${colorHex.bg2} `,
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead
            sx={{
              bgcolor: colorHex.bg2,
            }}
          >
            <TableRow>
              {resultColumns.map(({ minWidth, label, align }) => (
                <StyledTableHeaderCell
                  align={align}
                  sx={{
                    minWidth,
                  }}
                >
                  {label}
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ResultRows.map((row) => (
              <TableRow
                key={row.ip + row.date}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                {resultColumns.map(({ id, align }) => (
                  <StyledTableCell align={align}>{row[id]}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
