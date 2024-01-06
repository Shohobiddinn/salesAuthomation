export interface ExpandatureExpenseType{
    id:string | undefined
    is_active:boolean
    expense_category_id:string
    expense_category_name:string
    name:string
}
export interface ExpandatureCategory{
    id:string | undefined
    is_active:boolean
    name:string
}
