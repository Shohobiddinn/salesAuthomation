export interface Agents{
    agent_id:string
    agent_name:string
}
export interface PrintersModel{
    id:number
    name:string
    url:string
    is_active:boolean
    agents: Array<Agents>
}
