import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";
import { Station, StationData, StationStatus, WogStation } from "../../models/wog";

export const filterWogStations = (data: WogStation, params: FetchParams) => {
    return data.data.stations
                    .filter(station => 
                        isInRange(
                            params.range, params.location, 
                            { lat: station.coordinates.latitude, lon: station.coordinates.longitude}
                            )
                        )
}

const parseWog = (data: Station[], statuses: StationStatus[], params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        for (const station of data) {
            const stationData = statuses.find(status => status.data.id === station.id)
            if(stationData) {
                const { workDescription } = stationData.data
                const push = () => {
                    const fuelStation = new FuelStation(station)
                    fuelStation.fuelTypesAvailable = workDescription
                    fuel_stations.push(fuelStation)
                }            
                switch(params.fuelType){                               
                    case FuelTypes.A95:
                        if(workDescription.includes('М95 - Готівка') || workDescription.includes('A95 - Готівка')){
                            push()                        
                        }
                        break
                    case FuelTypes.DIESEL:
                        if(workDescription.includes('МДП+ - Готівка') || workDescription.includes('ДП - Готівка')){
                            push()                        
                        }
                        break 
                    case FuelTypes.LPG:
                        if(workDescription.includes('ГАЗ - Готівка')){
                            push()                        
                        }
                        break 
                    default:
                        break
                }
            }
        }
    } catch(e) {
        console.error(e)
        console.error('Wog data parsing error')
    }
    return fuel_stations
}

export default parseWog