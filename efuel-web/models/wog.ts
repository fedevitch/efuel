// Generated by https://quicktype.io

export interface WogStation {
    data: Data;
}

export interface Data {
    service_filters:         ServiceFilter[];
    fuel_filters:            FuelFilter[];
    applied_service_filters: any[];
    applied_fuel_filters:    any[];
    stations:                Station[];
}

export interface FuelFilter {
    price:  number;
    cla:    string;
    brand?: string;
    name:   string;
    id:     number;
}

export interface ServiceFilter {
    icon: string;
    name: string;
    id:   number;
}

export interface Station {
    link:        string;
    city?:       string;
    coordinates: Coordinates;
    name:        string;
    id:          number;
}

export interface Coordinates {
    longitude: number;
    latitude:  number;
}

// response https://api.wog.ua/fuel_stations/{Station.id}

export interface StationStatus {
    data: StationData;
}

export interface StationData {
    link:            string;
    city:            string;
    coordinates:     Coordinates;
    workDescription: string;
    fuels:           Fuel[];
    services:        Service[];
    schedule:        Schedule[];
    name:            string;
    id:              number;
}

export interface Coordinates {
    longitude: number;
    latitude:  number;
}

export interface Fuel {
    cla:   string;
    brand: string;
    name:  string;
    id:    number;
}

export interface Schedule {
    day:      string;
    interval: string;
}

export interface Service {
    icon: string;
    name: string;
    id:   number;
}

