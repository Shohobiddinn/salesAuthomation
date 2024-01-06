export interface TerritoryModel {
  id?: number;
  name: string;
  lat_lng: {
    latitude: string;
    longitude: string;
  };
  is_active: boolean;
  region_id: string;
}
