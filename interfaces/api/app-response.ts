export interface AppResponse<Type> {
    page_number: number;
    total_pages: number;
    total_count: number;
    has_pervious_page: boolean;
    has_next_page: boolean;
    items: Array<Type>;
}