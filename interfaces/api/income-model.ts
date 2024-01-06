export interface Products{
    product_id:string
    product_name:string
    unit_count:number
    count:number
    price:number
}
export interface IncomeModel{
    id:string | undefined
    is_active: boolean
    income_date:string
    created_date:string
    supplier_id:string
    warehouse_id:string
    price_type_id:string
    comment:string
    products:Array<Products>
}
