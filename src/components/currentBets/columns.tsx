import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export const columnSports: ColumnsInterface<any>[] = [
  {
    id: "sportName",
    label: "Sports",
    minWidth: 70,
  },
  {
    id: "eventName",
    label: "Event Name",
    minWidth: 70,
  },
  {
    id: "marketname",
    label: "Market Name",
    minWidth: 70,
  },
  {
    id: "nation",
    label: "Nation",
    minWidth: 70,
  },
  {
    id: "rate",
    label: "User Rate",
    minWidth: 70,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 70,
  },
  {
    id: "time",
    label: "Place Date",
    minWidth: 70,
  },
  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

export const columnCasino: ColumnsInterface<any>[] = [
  {
    id: "eventName",
    label: "event",
    minWidth: 70,
  },
  {
    id: "nation",
    label: "Nation",
    minWidth: 70,
  },
  {
    id: "rate",
    label: "User Rate",
    minWidth: 70,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 70,
  },
  {
    id: "date",
    label: "Place Date",
    minWidth: 70,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 70,
  },
];
