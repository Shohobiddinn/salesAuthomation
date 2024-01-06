export interface BonusesClientCategories {
  client_category_id: string;
}
export interface CurrencyId {
  currency_id: string;
}
export interface Agents {
  agent_id: string;
}
export interface Territory {
  territory_id: string;
}
export interface PriceType {
  price_type_id: string;
}
export interface Terms {
  min: number;
  value: number;
  count: number;
  max: number;
}
export interface TermDiscount {
  value: number;
  rebate: number;
}
export interface FromProduct {
  product_id: string;
}
export interface ToProduct {
  product_id: string;
}
export interface ClientCategories {
  client_category_id: string;
}
export interface BonusesModel {
  id: string | undefined;
  is_active: boolean;
  bonus_type: {
    id: number;
    name: string;
  };
  name: string;
  valid_from: string;
  valid_to: string;
  in_block: boolean;
  is_public: boolean;
  is_special: boolean;
  bonus_client_categories: Array<BonusesClientCategories>;
  currencies: Array<CurrencyId>;
  agents: Array<Agents>;
  territories: Array<Territory>;
  price_types: Array<PriceType>;
  terms: Array<Terms>;
  from_products: Array<FromProduct>;
  to_products: Array<ToProduct>;
}
export interface DiscountModel {
  id: string | undefined;
  is_active: boolean;
  name: string;
  type: string;
  valid_from: string;
  valid_to: string;
  is_public: boolean;
  is_special: boolean;
  agents: Array<Agents>;
  client_categories: Array<ClientCategories>;
  currencies: Array<CurrencyId>;
  price_types: Array<PriceType>;
  terms: Array<TermDiscount>;
  to_products: Array<ToProduct>;
}
