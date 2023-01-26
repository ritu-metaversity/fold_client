import { CopyAll } from "@mui/icons-material";
import React from "react";
import { PaymentDetailContainer, SpacedBetween } from "./styledComponents";

const BankInfoComponent = () => {
  return (
    <PaymentDetailContainer>
      <SpacedBetween>
        Bank Name
        <span>
          IDFC FIRST Bank <CopyAll />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        Account Number
        <span>
          1010101010101 <CopyAll />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        IFSC Code
        <span>
          IFSC02394834 <CopyAll />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        Account Holder Name
        <span>
          SS ENTER <CopyAll />
        </span>
      </SpacedBetween>
    </PaymentDetailContainer>
  );
};

export default BankInfoComponent;
