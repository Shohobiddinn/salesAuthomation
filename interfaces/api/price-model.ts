export interface Products {
    product_id: string | null | undefined
    product_name: string,
    cost: number | null | undefined
}
export interface PriceModel {
    is_active: boolean
    id: string
    price_type_id: string
    products: Array<Products>
}

export interface PriceSale {
    id?: string
    price_type_id: string | null
    price_type: string | null
    currency: string | null
    date: string | null

}

export interface Prices {
    price_type_id: string | null | undefined
    cost: number | null | undefined
}

export interface PriceList {
    product_name: string
    quantity: number
    id?: string
    products: Array<Prices>
}