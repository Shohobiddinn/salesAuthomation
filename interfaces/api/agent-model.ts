export interface AgentModel {
    id?: string,
    first_name: string;
    middle_name: string;
    last_name: string;
    phone: string;
    login: string;
    code: string;
    color: string;
    email: string;
    apk_version: string;
    agent_type: string;
    password: string | null;
    is_active: boolean;
}
