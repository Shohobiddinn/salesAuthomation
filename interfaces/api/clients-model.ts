import { LocationModel } from "./client-location-model"

export interface EmployeesClients {
    employee_id: string
    role?: string
    visit_days: Array<string>
}
export interface DepositLimit {
    currency_id: string
    allowed_minimum_balance: number
}
export interface ClientsModel {
    id: string
    territory_id: string
    client_category_id: string
    navigate: string
    address: string
    lat_lng: LocationModel
    is_active: boolean
    name: string
    company_name: string
    phone: string
    contact: string
    inn: string
    jshshir: string
    code: string
    number_of_contract: string
    client_type_id: string
    sales_channel_id: string
    description: string
    balance: string
    account: string
    bank: string
    mfo: string
    oked: string
    code_nds: string
    expeditor_id: string
    product_categories: Array<string>
    employee_clients: Array<EmployeesClients>
    deposit_limits: Array<DepositLimit>
}
export interface ClientsArray {

}
export interface ClientsAttachAgents {

}
export interface ClientPaymentModel {
    id: string | undefined
    is_active: boolean
    client_id: string
    agent_id: string
    payment_courier_id: string
    payment_received_date: string
    currency_id: string
    cash_box_id: string
    payment_amount: number
    description: string
    payment_approved_date?: string,
    currency_name?: string,
    transaction_type?: string,
    created_date?: string,
    created_by?: {
        id: string,
        name: string
    },
    modified_by?: {
        id: string,
        name: string
    },
    phone?: string,
}
