
export interface Items{
    from:number
    to:number
    bonus:number
    kpi_share:number
}
export interface KpiTemplate{
    id:string | undefined
    is_active:boolean
    name:string
    type:number
    comment:string
    segments:[]
    territories:[]
    price_types:[]
    currencies:[]
    products:[]
    reward_type:number
    reward:number
    share_in_total_kpi:[]
    items:Array<Items>
}
