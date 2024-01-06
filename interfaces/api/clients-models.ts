export interface EmployeeClients{
    employee_id:string
    visit_days:Array<string>
}
export interface ClientsModels{
    id:string | undefined
    is_active:boolean
    territory_id:string
    client_category_id:string
    name:string
    company_name:string
    address:string
    navigate:string
    phone:string
    contact:string
    inn:string
    jshshir:string
    client_type_id:string
    sales_channel_id:string
    description:string
    lat:string
    lon:string
    code:string
    number_of_contract:string
    account:string
    bank:string
    mfo:string
    oked:string
    code_nds:string
    employee_clients:Array<EmployeeClients>
}
