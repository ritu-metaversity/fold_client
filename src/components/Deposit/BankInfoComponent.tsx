import { CopyAll } from "@mui/icons-material";
import React, { FC } from "react";
import snackBarUtil from "../layout/snackBarUtil";
import { BankDetailInterface } from "./PaymentMethods";
import { PaymentDetailContainer, SpacedBetween } from "./styledComponents";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  bankDetails?: BankDetailInterface;
}

function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    snackBarUtil.error("Unable to copy to clipboard");
  }
  document.body.removeChild(textArea);
}

export const CopyComp = ({ str }: { str: string }) => {
  const copy = () => snackBarUtil.success("Copied to your clipboard !!!");

  return (
    <CopyToClipboard text={str} onCopy={() => copy()}>
      <CopyAll
        sx={{ cursor: "pointer", fontSize: { xs: "0.9rem", md: "initial" } }}
      />
    </CopyToClipboard>
  );
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
