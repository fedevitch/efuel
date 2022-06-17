import { CollectionAttributes as OKKO_station } from '../models/okko'
import { Station as WogStation } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { Attributes as SocarStation } from '../models/socar'

export default class FuelStation {
    constructor(station: OKKO_station | WogStation | SocarStation) {
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
        this.brand = "OKKO";
        this.name = `${station.type_azk} ${station.Cod_AZK} ${station.Naselenyy_punkt}`;
        this.address = station.Adresa;
        this.location = { lat: station.coordinates.lat, lon: station.coordinates.lng };
        this.fuelTypesAvailable = `
        ${station.a95_evro_tip_oplati ? ' A95 ': ''} 
        ${station.pulls95_tip_oplati ? ' PULLS95 ' : ''}
        ${station.dp_evro_tip_oplati ? ' DIESEL ' : ''}
        ${station.pullsdiesel_tip_oplati ? ' PULLS DIESEL ' : ''}
        ${station.gas_tip_oplati ? ' LPG ' : ''}`
    }

    private fromWog(station: WogStation){
        this.brand = "WOG";
        this.name = station.name;
        this.address = station.city || "";
        this.location = {
            lat: station.coordinates.latitude,
            lon: station.coordinates.longitude
        };
    }
    
    private fromSocar(station: SocarStation){
        this.brand = "Socar";
        this.name = station.title;
        this.address = station.address;
        this.location = { lat: station.marker.lat, lon: station.marker.lng };
        this.fuelTypesAvailable = station.fuelPrices.join(',');
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