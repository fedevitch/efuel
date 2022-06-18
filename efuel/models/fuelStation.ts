import { CollectionAttributes as OKKO_station } from '../models/okko'
import { Station as WogStation } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { Attributes as SocarStation } from '../models/socar'
import L from 'leaflet'


enum Brands {
    Okko = "OKKO",
    Wog = "WOG",
    Socar = "Socar",
    Ukrnafta = "Ukrnafta"
}

export default class FuelStation {
    constructor(station: OKKO_station | WogStation | SocarStation | UkrnaftaStation) {
        this.brand = "";
        this.name = "";
        this.address = "";
        this.fuelTypesAvailable = "";
        this.location = { lat: 0, lon: 0 }
        this._stationRaw = station;

        if(this.isOKKO()) {
            this.fromOkko(station as OKKO_station)
        } else if(this.isWOG()) {
            this.fromWog(station as WogStation)
        } else if(this.isSocar()) {
            this.fromSocar(station as SocarStation)
        } else if(this.isUkrnafta()){
            this.fromUkrnafta(station as UkrnaftaStation)
        }

    }

    public brand: string;
    public name: string;
    public location: Coordinates;
    public address: string;
    public fuelTypesAvailable: string;
    private _stationRaw: object;

    private isOKKO = () => this._stationRaw.hasOwnProperty('pulls95_tip_oplati')
    private isWOG = () => this._stationRaw.hasOwnProperty('link')
    private isSocar = () => this._stationRaw.hasOwnProperty('city_slug')
    private isUkrnafta = () => this._stationRaw.hasOwnProperty('brand')

    private fromOkko(station: OKKO_station) {
        this.brand = Brands.Okko;
        this.name = `${station.type_azk} ${station.Cod_AZK} ${station.Naselenyy_punkt}`;
        this.address = station.Adresa;
        this.location = { lat: station.coordinates.lat, lon: station.coordinates.lng };
        this.fuelTypesAvailable = `
        ${station.a95_evro_tip_oplati ? ' A95 ': ''} 
        ${station.pulls95_tip_oplati ? ' PULLS95 ' : ''}
        ${station.dp_evro_tip_oplati ? ' DIESEL ' : ''}
        ${station.pullsdiesel_tip_oplati ? ' PULLS DIESEL ' : ''}
        ${station.gas_tip_oplati ? ' LPG ' : ''}`;
    }

    private fromWog(station: WogStation){
        this.brand = Brands.Wog;
        this.name = station.name;
        this.address = station.city || "";
        this.location = {
            lat: station.coordinates.latitude,
            lon: station.coordinates.longitude
        };
    }
    
    private fromSocar(station: SocarStation){
        this.brand = Brands.Socar;
        this.name = station.title;
        this.address = station.address;
        this.location = { lat: station.marker.lat, lon: station.marker.lng };
        this.fuelTypesAvailable = station.fuelPrices.join(',');
    }

    private fromUkrnafta(station: UkrnaftaStation){
        this.brand = Brands.Ukrnafta;
        this.name = station.brand;
        this.address = station.addr;
        this.location = { lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lon) };
        this.fuelTypesAvailable = `
        A80:${station.a80}, 
        A90:${station.a90}, 
        A92:${station.a92}, 
        A92E:${station.a92e}, 
        A95:${station.a95}, 
        A95E:${station.a95e}, 
        E95S:${station.e95s}, 
        Diesel:${station.dt}, 
        DieselE:${station.dte}, 
        LPG:${station.gas}
        `;
    }
}

export enum FuelTypes {
    A95 = 'A95',
    A92 = 'A92',
    DIESEL = 'DIESEL',
    LPG = 'LPG'
}

export interface Coordinates {
    lat: number, 
    lon: number
}

const R = 6371

export const AngleLatitude = (Latitude: number):number => (360 * Latitude) / (2 * Math.PI * R)
export const Latitude = (AngleLatitude: number):number => Math.round((2 * Math.PI * R * AngleLatitude) / 360)

// const okkoMarker = new L.Icon({
//     iconUrl: '../public/okko-pin.png',
//     iconRetinaUrl: '../public/okko-pin.png',
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
// })

// const wogMarker = new L.Icon({
//     iconUrl: '../public/wog-icon.png',
//     iconRetinaUrl: '../public/wog-icon.png',
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
// })

// const socarMarker = new L.Icon({
//     iconUrl: '../public/socar-map-marker.svg',
//     iconRetinaUrl: '../public/socar-map-marker.svg',
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
// })

// const defaultMarker = new L.Icon({
//     iconUrl: '../public/marker-icon-2x.png',
//     iconRetinaUrl: '../public/marker-icon-2x.png',
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
// })

// export const getStationMarker = (brand: string) => {
//     switch(brand){
//         case Brands.Okko:
//             return okkoMarker
//         case Brands.Wog:
//             return wogMarker
//         case Brands.Socar:
//             return socarMarker
//         default:
//             return defaultMarker
//     }
// }