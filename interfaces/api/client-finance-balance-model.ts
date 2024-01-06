import { BalanceModel } from "./client-detail-model"

export interface ClientFinanceBalanceModel  {
    visual_id: number,
    client_id: string,
    client_name: string,
    comany_name: string,
    phone: string,
    inn: string,
    territory_name: string,
    total_balance: number,
    balance: BalanceModel[]
    term_date: string,
    delayed_days: number,
    last_payment_date: string,
    days_since_last_payment: number
  }