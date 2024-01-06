interface ClientDetailModel {
  id?: string,
  name: string,
  company_name: string,
  phone: string,
  territory: string,
  category: string,
  address: string,
  navigate: string,
  contact: string,
  visit_days: string[],
  agents: string[],
  created_date: string,
  created_by: string,
  last_modified_date: string,
  balance: BalanceModel
  is_active: true
};

interface BalanceModel {
  [currency: string]: number
}

export type { ClientDetailModel, BalanceModel }