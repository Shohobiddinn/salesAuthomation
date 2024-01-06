export interface AgentLimitReportModel {
  agent: string,
  warehouse: string,
  product: string,
  type: string,
  limit_amount: number,
  sale_amount: number,
  remain: number
}