import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Card from "./card";
import {
  CardContainerContainer,
  ImageUploadContainer,
} from "./styledComponents";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BankInfoComponent from "./BankInfoComponent";
import UPIDetails from "./UPIDetails";
import QRcodeComponent from "./QRcodeComponent";

const paymentArr = ["upi", "bank", "qrcode"];

const DepositManually = () => {
  const [selected, setSelected] = useState("");
  const handleClick = (id: string) => {
    setSelected(id);
  };
  return (
    <div>
      <Box>
        <h2 style={{ color: "white" }}>Pay 10000/-</h2>
        <Typography my={4}>Pay Manually</Typography>
        <CardContainerContainer>
          {paymentArr.map((elem) => (
            <Card
              selected={selected === elem}
              handleClick={() => handleClick(elem)}
            />
          ))}
        </CardContainerContainer>
        {selected === "bank" && <BankInfoComponent />}
        {selected === "upi" && <UPIDetails />}
        {selected === "qrcode" && <QRcodeComponent />}
        <label style={{ width: "100%" }}>
          <ImageUploadContainer>
            <AddCircleIcon htmlColor="white" />
            <Typography>Click here to upload payment screenshot</Typography>
          </ImageUploadContainer>
          <input type="file" style={{ display: "none" }} />
        </label>
      </Box>
    </div>
  );
};

export default DepositManually;
