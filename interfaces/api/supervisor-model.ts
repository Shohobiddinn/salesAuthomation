import { AgentModel } from "./agent-model"
interface SupervisorModel {
    id: string,
    is_active: boolean,
    last_name: string,
    first_name: string,
    middle_name: string,
    phone: string,
    login: string,
    code: string,
    color: string,
    password: string,
    apk_version: string,
    application_access: boolean,
    agent_ids: string[]
    agents: AgentModel[]
}

export type { AgentModel, SupervisorModel }