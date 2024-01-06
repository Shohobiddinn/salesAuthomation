export interface ClientLocationModel {
    name: string,
    lat_lng: LocationModel,
    id?: string,
    is_active: boolean
}

export interface LocationModel {
    latitude: number,
    longitude: number
}