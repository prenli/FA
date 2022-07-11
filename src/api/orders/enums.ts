import { LocalTradeOrderStatus } from "hooks/useLocalTradeStorageState";

export const ORDER_STATUS = {
  Pending: LocalTradeOrderStatus, // local storage state
  Executable: "1",
  Executed: "2",
  Cancelled: "3",
  Open: "4",
  Accepted: "5",
  "In execution": "6",
  "Executed in the market": "7",
  Rejected: "8",
  Expired: "9",
  "Sent to execution": "10",
  "Settled in market": "11",
  "Partially executed in the market": "12",
} as const;
