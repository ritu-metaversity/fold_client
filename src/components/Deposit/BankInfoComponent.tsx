import { CopyAll } from "@mui/icons-material";
import React, { FC } from "react";
import snackBarUtil from "../layout/snackBarUtil";
import { BankDetailInterface } from "./PaymentMethods";
import { PaymentDetailContainer, SpacedBetween } from "./styledComponents";

interface Props {
  bankDetails?: BankDetailInterface;
}

export const CopyComp = ({ str }: { str: string }) => {
  const copy = async () => {
    await window.navigator.clipboard.writeText(str);
    snackBarUtil.success("Copied to your clipboard !!!");
  };

  return <CopyAll sx={{ cursor: "pointer" }} onClick={() => copy()} />;
};
const BankInfoComponent: FC<Props> = ({ bankDetails }) => {
  if (!bankDetails) return <></>;

  const { bankName, accountHolderName, accountNumber, ifscCode } = bankDetails;
  return (
    <PaymentDetailContainer>
      <SpacedBetween>
        Bank Name
        <span>
          {bankName} <CopyComp str={bankName} />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        Account Number
        <span>
          {accountNumber} <CopyComp str={accountNumber} />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        IFSC Code
        <span>
          {ifscCode} <CopyComp str={ifscCode} />
        </span>
      </SpacedBetween>
      <SpacedBetween>
        Account Holder Name
        <span>
          {accountHolderName} <CopyComp str={accountHolderName} />
        </span>
      </SpacedBetween>
    </PaymentDetailContainer>
  );
};

export default BankInfoComponent;
