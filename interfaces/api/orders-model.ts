export interface OrderProducts {
  product_id: string
  amount: number
  price: number
}
export interface BonusProducts {
  product_id: string
  count: number
  price: number
  bonus_id:string
}
export interface OrdersModel {
  id: string | undefined
  is_active: boolean
  agent_id: string
  client_id: string
  shipped_date: string
  price_type_id: string
  required_date: string
  warehouse_id: string
  expected_delivery_date: string
  consignation_term: string
  discount_id: string
  products: Array<OrderProducts>
  bonus_products:Array<BonusProducts>
}
