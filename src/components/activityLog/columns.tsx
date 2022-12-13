import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";
import { columnIds } from "./rows";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "username",
    label: "Username",
    minWidth: 70,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 70,
  },

  {
    id: "ip",
    label: "Ip Address",
    minWidth: 70,
  },
];
