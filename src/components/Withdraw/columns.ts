import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export type columnIds = "username" | "date" | "ip" | "detail"|"IFSC"|"cur";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "username",
    label: "Account Number",
  },
  {
    id: "date",
    label: "Account Name",
  },

  {
    id: "ip",
    label: "Amount",
    align: "right",
  },

  {
    id: "detail",
    label: "Bank Name / Address",
    minWidth: 70,
  },
  {
    id: "IFSC",
    label: "IFSC Code",
  },
  {
    id: "cur",
    label: "Account Type / Currency",
  },
  {
    id: "IFSC",
    label: "Date",
  },
  {
    id: "IFSC",
    label: "Remark",
  },
  {
    id: "IFSC",
    label: "Status",
  },
];
