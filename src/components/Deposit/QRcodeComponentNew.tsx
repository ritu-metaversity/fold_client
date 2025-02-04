import { Download } from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { WithdrawInput } from "../Withdraw/styledComponent";
import { PaymentDetailContainer, QrImg } from "./styledComponents";
import { DepositTypeItem } from "./types";

interface Props {
  qrDetails?: DepositTypeItem;
}
const QRcodeComponentNew: FC<Props> = ({ qrDetails }) => {
  if (!qrDetails) return <></>;
  return (
    <PaymentDetailContainer>
      <Typography textAlign="left">QR code for payment</Typography>
      <Divider />
      <Grid container gap={{ md: "3.33%" }}>
        <Grid item xs={12} md={5.8}>
          <QrImg src={qrDetails.accountNumber} />
        </Grid>
        <Grid xs={12} md={5.8} py={2} textAlign="left">
          <Typography m={1} variant="caption">
            Display Name
          </Typography>
          <WithdrawInput
            fullWidth
            disabled
            value={qrDetails.accountHolderName}
            sx={{ width: "100% !important" }}
            placeholder="Display Name"
          />
          <Button
            sx={{ my: 3 }}
            color="secondary"
            variant="contained"
            startIcon={<Download />}
            fullWidth
            href={qrDetails.accountNumber}
            className="download_link"
            download={"image.png"}
          >
            QR Code
          </Button>
        </Grid>
      </Grid>
    </PaymentDetailContainer>
  );
};

export default QRcodeComponentNew;
