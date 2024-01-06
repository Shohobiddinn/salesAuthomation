export interface AgentPacketModel {
  id?: string,
  is_active: boolean,
  last_name: string,
  first_name: string,
  middle_name: string,
  products: [
    {
      product_id: string,
      product_name: string
    }
  ],
  price_types: [
    {
      price_type_id: string,
      price_type: string
    }
  ]
}