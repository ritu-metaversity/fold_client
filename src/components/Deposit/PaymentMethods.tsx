import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardContainerContainer } from "./styledComponents";
import { userServices } from "../../utils/api/user/services";
import Card from "./card";
import snackBarUtil from "../layout/snackBarUtil";
import UPIDetailsNew from "./UPIDetailsNew";
import { DepositTypeItem } from "./types";
import QRcodeComponentNew from "./QRcodeComponentNew";

export interface BankDetailInterface {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface UPIDetailsInterface {
  upiId: string;
  displayName: string;
  upiName: string;
}
export interface QRDetailInterface {
  displayName: string;
  qrCodeImage: string;
}
// interface PaymentDataInterface {
//   paymentMethods: { methodName: string; logo: string }[];
//   bankDetail: BankDetailInterface;
//   upiDetail: UPIDetailsInterface;
//   qrCode: QRDetailInterface;
// }

export function PaymentMethods() {
  const [selected, setSelected] = useState("");
  // const [paymentData, setPaymentData] = useState<PaymentDataInterface | null>(
  //   null
  // );
  const [paymentDataNew, setPaymentDataNew] = useState<DepositTypeItem[]>([]);
  const handleClick = (id: string) => {
    setSelected(id);
  };
  useEffect(() => {
    const getPaymentData = async () => {
      //  const { response } = await userServices.getPaymentDetail();
      //  if (response) {
      //    setPaymentData(response.data);
      //    try {
      //      if (response?.data?.paymentMethods[0]) {
      //        setSelected(response.data.paymentMethods[0]?.methodName);
      //      } else {
      //        snackBarUtil.error("Sorry no payment Methods Found");
      //      }
      //    } catch {
      //      snackBarUtil.error("Sorry no payment Methods Found");
      //    }
      //  }
      const { response } = await userServices.getPaymentDetailNew();
      if (response) {
        setPaymentDataNew(response.data);
        try {
          const data: DepositTypeItem[] = response.data || [];
          if (data?.length) {
            setSelected(data[0].depositType);
          } else {
            snackBarUtil.error("Sorry no payment Methods Found");
          }
        } catch {
          snackBarUtil.error("Sorry no payment Methods Found");
        }
      }
    };
    getPaymentData();
  }, []);

  return (
    <>
      <Typography my={4}>Pay Manually</Typography>
      <CardContainerContainer>
        {/* {paymentData?.paymentMethods?.map(
           (elem) => (
             // elem.methodName.toUpperCase() !== "BANK" && (
             <Card
               selected={selected === elem.methodName}
               details={elem}
               handleClick={() => handleClick(elem.methodName)}
             />
           )
           // )
         )} */}
        {paymentDataNew?.map(
          (elem) =>
            elem.depositType.toUpperCase() !== "BANK" && (
              <Card
                selected={selected === elem.depositType}
                details={{ logo: elem.image, methodName: elem.depositType }}
                handleClick={() => handleClick(elem.depositType)}
              />
            )
        )}
      </CardContainerContainer>
      {/* {selected === "Bank" && (
        <BankInfoComponent bankDetails={paymentData?.bankDetail} />
      )} */}
      {/* {selected === "UPI" && (
         <UPIDetails upiDetails={paymentData?.upiDetail} />
       )} */}
      {selected === "UPI" && (
        <UPIDetailsNew
          upiDetails={paymentDataNew?.find((i) => i.depositType === "UPI")}
        />
      )}
      {/* {selected === "QR" && (
         <QRcodeComponent qrDetails={paymentData?.qrCode} />
       )} */}
      {selected === "QR" && (
        <QRcodeComponentNew
          qrDetails={paymentDataNew.find((i) => i.depositType === "QR")}
        />
      )}
    </>
  );
}
