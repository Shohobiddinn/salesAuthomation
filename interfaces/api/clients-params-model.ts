export interface ClientsParamsModel {
  page: number,
  page_size: number,
  search: string,
  agent?: string[],
  territory?: string[],
  client_category?: string[],
  price_type?: string[],
  day?: string[],
  expeditor?: string[],
  device?: string[],
  is_active?: boolean,
  location?: boolean,
  inn?: boolean,
}