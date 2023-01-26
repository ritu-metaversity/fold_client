import { CopyAll } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { PaymentDetailContainer } from "./styledComponents";

const UPIDetails = () => {
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
              <img />
            </TableCell>
            <TableCell>INFINITY BOOKS</TableCell>
            <TableCell align="right">
              INFINITYBOOKS@rbl <CopyAll />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PaymentDetailContainer>
  );
};

export default UPIDetails;
