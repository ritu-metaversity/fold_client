import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export type columnIds = "image" | "amount" | "time" | "status";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "amount",
    label: "Amount",
    align: "right",
  },

  {
    id: "image",
    label: "Image",
    minWidth: 70,
    align: "center",
  },

  {
    id: "time",
    label: "Date",
  },

  {
    id: "status",
    label: "Status",
  },
];
