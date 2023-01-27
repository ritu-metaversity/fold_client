import { CopyAll } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { FC } from "react";
import { CopyComp } from "./BankInfoComponent";
import { UPIDetailsInterface } from "./PaymentMethods";
import { PaymentDetailContainer } from "./styledComponents";

interface Props {
  upiDetails?: UPIDetailsInterface;
}
const UPIDetails: FC<Props> = ({ upiDetails }) => {
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
              {upiDetails.upiName}
            </TableCell>
            <TableCell>{upiDetails.displayName}</TableCell>
            <TableCell align="right">
              {upiDetails.upiId} <CopyComp str={upiDetails.upiId} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PaymentDetailContainer>
  );
};

export default UPIDetails;
