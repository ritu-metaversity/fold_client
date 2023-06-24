import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export type columnIds =
  | "accountNumber"
  | "accountHolderName"
  | "amount"
  | "bankName"
  | "ifsc"
  | "accountType"
  | "action";

export const savedColumns: ColumnsInterface<columnIds>[] = [
  {
    id: "accountNumber",
    label: "Account Number",
  },
  {
    id: "accountHolderName",
    label: "Account Name",
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
  },
  {
    id: "action",
    label: "Action",
  },
];
