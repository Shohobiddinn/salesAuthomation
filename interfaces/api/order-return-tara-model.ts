export interface OrderReturnTaraModel{
    id:string | undefined
    client_id:string
    agent_id:string
    items:Array<Taras>
}

export interface Taras{
    tara_id:string
    amount:number
}
