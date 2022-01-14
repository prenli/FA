export enum SECURITY_TYPE {
  STOCK = "STOCK",
  ETF = "ETFs",
  BOND = "BOND",
  FUND = "FUND",
  CURRENCY = "CURRENCY",
}

export enum ORDER_STATUS {
  Executable = 1,
  Executed,
  Cancelled,
  Open,
  Accepted,
  "In execution",
  "Executed in the market",
  Rejected,
  Expired,
  "Sent to execution",
  "Settled in market",
  "Partially executed in the market",
}