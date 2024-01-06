import type { ClientLocationModel } from "./client-location-model";
import { StatisticsModel } from "./statistics-model";

export interface ClientFilterMapsModel {
    clients: ClientLocationModel[]
    statistics: StatisticsModel[]
}