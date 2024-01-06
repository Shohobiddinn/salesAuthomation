export interface WarehousesModel{
    id:number | undefined
    name:string
    type:string
    code:string
    warehouse_man_id:string
    currencies_id:Array<string>
    agents_id:Array<string>
}
