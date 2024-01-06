export interface MarginPriceModel {
  price_type_id: string;
  product_category_id: string;
  set_price_method: number;
  rate: number;
  midpoint_rounding: number;
  rounding_accuracy: number;
}
