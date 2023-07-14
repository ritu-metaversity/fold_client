import {
  styled,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { FC } from "react";
import { CopyComp } from "./BankInfoComponent";
import { PaymentDetailContainer } from "./styledComponents";
import { DepositTypeItem } from "./types";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "5px 2px",
    fontSize: "0.8rem",
  },
}));
interface Props {
  upiDetails?: DepositTypeItem;
}
const UPIDetailsNew: FC<Props> = ({ upiDetails }) => {
  if (!upiDetails) return <></>;
  return (
    <PaymentDetailContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mode</TableCell>
            <TableCell>Display Name</TableCell>
            <TableCell align="right">UPI Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {/* <img />
               */}
              {upiDetails.depositType}
            </TableCell>
            <TableCell>{upiDetails.accountHolderName}</TableCell>
            <TableCell align="right">
              {upiDetails.accountNumber}
              <CopyComp str={upiDetails.accountNumber} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PaymentDetailContainer>
  );
};

export default UPIDetailsNew;
