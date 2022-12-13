import { columnIds, ColumnsInterface } from "./StyledTableHeaderCell";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "date",
    label: "Date",
    minWidth: 70,
  },
  {
    id: "index",
    label: "Sr no",
    minWidth: 70,
    align: "right",
  },
  {
    id: "credit",
    label: "Credit",
    align: "right",
    minWidth: 70,
  },
  {
    id: "debit",
    label: "Debit",
    align: "right",
    minWidth: 70,
  },
  {
    id: "points",
    label: "Pts",
    align: "right",
    minWidth: 70,
  },
  {
    id: "remarks",
    label: "Remarks",
  },
];
