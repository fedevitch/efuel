import { CollectionAttributes as OKKO_station } from '../models/okko'
import { Station as WogStation } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { Attributes as SocarStation } from '../models/socar'
import { Datum as UpgStation } from '../models/upg'
import { PointItem as BrsmStation } from './brsm'
import { AmicStation } from './amic'
import { Shell } from './shell'
import { Marker as Motto } from './motto'


export enum Brands {
    Okko = "OKKO",
    Wog = "WOG",
    Socar = "Socar",
    Ukrnafta = "Ukrnafta",
    Upg = "Upg",
    Brsm = "БРСМ-Нафта",
    Amic = "AMIC Energy",
    Shell = "Shell",
    Motto = "Motto"
}

export default class FuelStation {
    constructor(station: OKKO_station | WogStation | SocarStation | UkrnaftaStation | UpgStation | BrsmStation | AmicStation | Shell | Motto) {
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
        } else if(this.isUpg()) {
            this.fromUpg(station as UpgStation)
        } else if(this.isBrsm()) {
            this.fromBrsm(station as BrsmStation)
        } else if(this.isAmic()) {
            this.fromAmic(station as AmicStation)
        } else if(this.isShell()) {
            this.fromShell(station as Shell)
        } else if(this.isMotto()) {
            this.fromMotto(station as Motto)
        }

    }

    public brand: string;
    public name: string;
    public location: Coordinates;
    public address: string;
    public fuelTypesAvailable: string;
    private _stationRaw: object;

    private isOKKO = () => this._stationRaw.hasOwnProperty('pulls95_tip_oplati')
    private isWOG = () => this._stationRaw.hasOwnProperty('coordinates')
    private isSocar = () => this._stationRaw.hasOwnProperty('city_slug')
    private isUkrnafta = () => this._stationRaw.hasOwnProperty('a80')
    private isUpg = () => this._stationRaw.hasOwnProperty('FuelsAsArray')
    private isBrsm = () => this._stationRaw.hasOwnProperty('fuel_types')
    private isAmic = () => this._stationRaw.hasOwnProperty('icons')
    private isShell = () => this._stationRaw.hasOwnProperty('open_status')
    private isMotto = () => this._stationRaw.hasOwnProperty('toplivo')

    private fromOkko(station: OKKO_station) {
        this.brand = Brands.Okko;
        this.name = `${station.type_azk} ${station.Cod_AZK} ${station.Naselenyy_punkt}`;
        this.address = station.Adresa;
        this.location = { lat: station.coordinates.lat, lon: station.coordinates.lng };
        this.fuelTypesAvailable = station.notification.replaceAll(/(<([^>]+)>)/ig, '');
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
        A80: ${station.a80}, 
        A90: ${station.a90}, 
        A92: ${station.a92}, 
        A92E: ${station.a92e}, 
        A95: ${station.a95}, 
        A95E: ${station.a95e}, 
        E95S: ${station.e95s}, 
        Diesel: ${station.dt}, 
        DieselE: ${station.dte}, 
        LPG: ${station.gas}
        `;
    }

    private fromUpg(station: UpgStation){
        this.brand = Brands.Upg;
        this.name = station.FullName;
        this.address = station.Address;
        this.location = { lat: Number.parseFloat(station.Latitude), lon: Number.parseFloat(station.Longitude) };
        this.fuelTypesAvailable = `${station.FuelsAsArray.map(s => ` ${s.Title}: ${s.Price} `)}`
    }

    private fromBrsm(station: BrsmStation){
        this.brand = Brands.Brsm;
        this.name = station.phone;
        this.address = station.title;
        this.location = { lat: station.lat, lon: station.lng }
    }

    private fromAmic(station: AmicStation){
        this.brand = Brands.Amic;
        this.address = station.address;
        this.location = { lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lng) }
    }

    private fromShell(station: Shell){
        this.brand = Brands.Shell;
        this.name = station.name;
        this.address = `${station.address} ${station.postcode}`;
        this.location = { lat: station.lat, lon: station.lng }
        this.fuelTypesAvailable = `For check fuel availability please call ${station.telephone} 
        Fuels: ${station.fuels.map(f => f.split('_').map(w => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ')).join(', ')}`
    }

    private fromMotto(station: Motto){
        this.brand = Brands.Motto;
        this.name = station.name;
        this.address = station.address;
        this.location = { lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lng) };
        this.fuelTypesAvailable = station.toplivo;

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