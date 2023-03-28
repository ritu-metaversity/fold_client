import {
  Box,
  FormControlLabel,
  Paper,
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
import React, { useEffect, useState, useCallback } from "react";
import {
  StyledTableCell,
  StyledTableHeaderCell,
} from "./StyledTableHeaderCell";
import { colorHex } from "../../utils/constants";
import { Form } from "react-bootstrap";
import { userServices } from "../../utils/api/user/services";

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
export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
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


interface Props {
  remark: string;
  marketId: string;
}

interface RowInterface {
  nation: Element;
  rate: number;
  bhav: number;
  amount: number;
  win: 0;
  date: string;
  ip: string;
  browser: Element;
  type: string;
}

export function StatementPopUp({ marketId, remark }: Props) {
  const [betType, setbetType] = useState(1);
  const [ResultRows, setResultRows] = useState<RowInterface[]>([]);
  const [data, setData] = useState<any>();

  const getDetails = useCallback(async () => {
    const { response } = await userServices.accountStatementDetails({
      marketId,
      betType,
    });
    if (response.data) {
      let newRow = response.data.betList.map((item: any) => ({
        nation: (
          <label>
            <Form.Check
              type="checkbox"
              color="black"
              style={{ display: "inline", marginRight: 4 }}
            />
            {item.selectionname}
          </label>
        ),
        rate: item.pricevalue,
        bhav: item.odds,
        amount: item.stack,
        win: item.netpnl,
        date: item.matchedtime,
        ip: item.ipAddress,
        browser: (
          <BootstrapTooltip enterTouchDelay={1} title={item.deviceInfo}>
            <Box sx={{ textDecoration: "underline", cursor: "pointer" }}>
              Detail
            </Box>
          </BootstrapTooltip>
        ),
        type: item.isback ? "back" : "lay",
      }));

      setResultRows(newRow);
      setData(response.data);
    }
  }, [betType, marketId]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <Box fontSize={"0.75rem"} lineHeight="2">
      <Box>{remark}</Box>
      <Box display={"flex"} justifyContent="space-between">
        <span style={{ flex: 1 }}>{/* Winner: {data?.result} */}</span>
        <span style={{ flex: 1, textAlign: "right" }}>
          Game Time: {data?.betList[0]?.matchedtime}
        </span>
      </Box>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e: any, value: string) => setbetType(Number(value))}
      >
        {[
          { val: 1, name: "all" },
          { val: 2, name: "back" },
          { val: 3, name: "lay" },
          { val: 4, name: "deleted" },
        ].map((value) => (
          <FormControlLabel
            slotProps={{
              typography: {
                textTransform: "capitalize",
                fontSize: "0.8rem",
              },
            }}
            value={value.val}
            control={
              <Form.Check
                checked={value.val === betType}
                onChange={(e: any) => setbetType(value.val)}
                style={{ paddingInline: 10 }}
                type="radio"
              />
            }
            label={value.name}
          />
        ))}
      </RadioGroup>
      <Box display="flex" gap={1} pb={1}>
        <Typography component={"span"} fontSize="inherit">
          Total Bets:
        </Typography>
        <Typography
          component={"span"}
          fontSize="inherit"
          color={data?.totalBets >= 0 ? "green" : "red"}
        >
          {data?.totalBets}
        </Typography>
        <Typography component={"span"} fontSize="inherit">
          Total Wins:
        </Typography>
        <Typography
          component={"span"}
          fontSize="inherit"
          color={data?.totalStake >= 0 ? "green" : "red"}
        >
          {ResultRows.reduce((accu, item) => {
            return accu + item.win;
          }, 0)}
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
                  borderLeft: `5px solid  ${
                    row.type === "back" ? colorHex.back[1] : colorHex.lay[1]
                  }`,
                }}
              >
                {resultColumns.map(({ id, align }) => (
                  <StyledTableCell align={align}>
                    <>{row[id]}</>
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!(ResultRows.length > 0) && (
          <Typography width="100%" textAlign="center">
            No Records Found
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
}
