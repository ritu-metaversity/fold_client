import { CopyAll } from "@mui/icons-material";
import React, { FC } from "react";
import snackBarUtil from "../layout/snackBarUtil";
import { BankDetailInterface } from "./PaymentMethods";
import { PaymentDetailContainer, SpacedBetween } from "./styledComponents";

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
  const copy = async () => {
    if (navigator.clipboard) {
      // If normal copy method available, use it
      navigator.clipboard.writeText(str);
    } else {
      // Otherwise fallback to the above function
      unsecuredCopyToClipboard(str);
    }

    // await window.navigator.clipboard.writeText(str);
    snackBarUtil.success("Copied to your clipboard !!!");
  };

  return (
    <CopyAll
      sx={{ cursor: "pointer", fontSize: { xs: "0.9rem", md: "initial" } }}
      onClick={() => copy()}
    />
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
