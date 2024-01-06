export interface ListParams {
    page: number;
    page_size: number;
    pageSize?: number;
    search: any;
    order_by: OrderByParams | null;
    filter: Array<FilterParams> | null;
}
export interface ListParams2 {
    page: number;
    page_size: number;
    search: any;
    order_by: OrderByParams | null;
    filter: Array<FilterParams1> | null;
}

export interface SearchParams {
    field: string;
    keyword: string;
}

export interface OrderByParams {
    field: string;
    is_asc: boolean;
}

export interface FilterParams {
    field: string;
    value: Array<string>;
}
export interface FilterParams1 {
    agent: Array<string>
    territory: Array<string>
    client_category: Array<string>
    expeditor: Array<string>
    is_active: boolean,
    location: string,
    inn: string
}
