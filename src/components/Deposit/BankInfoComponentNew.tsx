import React, { FC } from "react";
import { PaymentDetailContainer, SpacedBetween } from "./styledComponents";
import { CopyComp } from "./BankInfoComponent";
import { DepositTypeItem } from "./types";

interface Props {
  bankDetails?: DepositTypeItem;
}

const BankInfoComponentNew: FC<Props> = ({ bankDetails }) => {
  if (!bankDetails) return <></>;

  const { bankName, accountHolderName, accountNumber, ifsc } = bankDetails;
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
          {ifsc} <CopyComp str={ifsc} />
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

export default BankInfoComponentNew;
