import { Download } from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { WithdrawInput } from "../Withdraw/styledComponent";
import { PaymentDetailContainer, QrImg } from "./styledComponents";

const QRcodeComponent = () => {
  return (
    <PaymentDetailContainer>
      <Typography textAlign="left">QR code for payment</Typography>
      <Divider />
      <Grid container>
        <Grid item xs={12} md={6}>
          <QrImg src="assets/images/icon.png" />
        </Grid>
        <Grid xs={12} md={6} py={2} textAlign="left">
          <Typography m={1} variant="caption">
            Display Name
          </Typography>
          <WithdrawInput
            sx={{ width: "100% !important" }}
            placeholder="Display Name"
          />
          <Button
            sx={{ my: 3 }}
            color="secondary"
            variant="contained"
            startIcon={<Download />}
            fullWidth
          >
            QR Code
          </Button>
        </Grid>
      </Grid>
    </PaymentDetailContainer>
  );
};

export default QRcodeComponent;
