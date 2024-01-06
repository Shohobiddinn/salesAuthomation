export interface KnowledgeCategoryModel {
    id?: number;
    name: string;
    is_active: boolean;
    created_date?: string;
    roles: Array<string>;
}