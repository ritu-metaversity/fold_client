import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export type columnIds =
  | "accountNumber"
  | "accountHolderName"
  | "amount"
  | "bankName"
  | "ifsc"
  | "time"
  | "accountType"
  | "remark"
  | "status"
  | "action";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "accountNumber",
    label: "Account Number",
  },
  {
    id: "accountHolderName",
    label: "Account Holder Name",
  },

  {
    id: "amount",
    label: "Amount",
    align: "right",
  },

  {
    id: "bankName",
    label: "Bank Name / Address",
    minWidth: 70,
    align: "center",
  },
  {
    id: "ifsc",
    label: "IFSC Code",
  },
  {
    id: "accountType",
    label: "Account Type / Currency",
    align: "center",
  },
  {
    id: "time",
    label: "Date",
    align: "center",
  },
  {
    id: "remark",
    label: "Remark",
    align: "center",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "action",
  },
];
