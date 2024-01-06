export interface Products{
    product_id?:string
}
export interface TarasModel{
    id?:string | undefined
    name:string
    sort:number
    is_active:boolean
    products:Array<Products>
}
