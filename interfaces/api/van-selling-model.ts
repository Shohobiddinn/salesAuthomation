export interface VanSellingModel {
  id: string | undefined,
  is_active: true,
  order_date: string,
  expected_shipping_date: string,
  shipped_date: string,
  received_to_warehouse_date: string,
  agent: {
    id: string,
    name: string
  },
  price_type: {
    id: string,
    name: string
  },
  agent_warehouse: {
    id: string,
    name: string
  },
  warehouse: {
    id: string,
    name: string
  },
  status: {
    id: 0,
    name: string
  },
  type: {
    id: 0,
    name: string
  },
  total_count: 0,
  total_cost: 0,
  created_by: {
    id: string,
    name: string
  },
  comment: string
}
