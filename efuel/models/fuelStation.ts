import { CollectionAttributes as OKKO_station } from '../models/okko'
import { WogStation } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'

export default class FuelStation {
    constructor() {
        this.name = "";
        this.address = "";
        this.fuelTypesAvailable = "";
        this.location = { lat: 0, lon: 0 }
    }

    public fromOkko(station: OKKO_station) {
        this.name = `${station.type_azk} ${station.Cod_AZK} ${station.Naselenyy_punkt}`;
        this.address = station.Adresa;
        this.location = { lat: station.coordinates.lat, lon: station.coordinates.lng };
        this.fuelTypesAvailable = `A95: ${station.a95_evro_tip_oplati}; 
        PULLS95: ${station.pulls95_tip_oplati};
        DIESEL: ${station.dp_evro_tip_oplati}
        PULLS DIESEL: ${station.pullsdiesel_tip_oplati}
        LPG: ${station.gas_tip_oplati}}`
    }

    public name: string;
    public location: Coordinates;
    public address: string;
    public fuelTypesAvailable: string;
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