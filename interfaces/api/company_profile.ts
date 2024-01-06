export interface Company_profile{
    id:number | undefined
    name?:string
    company_name:string
    phone:string
    territory_id:string
    address:string
    email:string
}
export interface CompanyN{
    nds:string
}
export interface CompanyProfileChangeC{
    telegram_bot:string
    bot_type:number
    audit:string
    enabled:boolean
    bonus_enabled:boolean
}
export interface CompanyPassword{
    login:string
    password:string
}
