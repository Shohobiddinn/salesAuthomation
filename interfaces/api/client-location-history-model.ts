export interface ClientLocationHistoryModel {
  client_id: string;
  lat_lng: {
    latitude: number;
    longitude: number;
  };
  for_date: string;
}
