import { Amic } from "../../models/amic";
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";

const parseAmic = (data: Amic, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        for(const [stationName, station] of Object.entries(data)){
            if(isInRange(params.range, params.location, { lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lng) })) {
                const push = () => {
                    const fuelStation = new FuelStation(station)
                    fuelStation.name = stationName               
                    fuel_stations.push(fuelStation)
                }
                switch(params.fuelType){ 
                    case FuelTypes.A92:
                        if(station.icons.hasOwnProperty('92 Євро') && station.icons['92 Євро'] !== null){
                            push()                        
                        }
                        break               
                    case FuelTypes.A95:
                        if((station.icons.hasOwnProperty('95 Євро') && station.icons['95 Євро'] !== null) || 
                        (station.icons.hasOwnProperty('95 Prem') && station.icons['95 Prem'] !== null)){
                            push()                        
                        }
                        break
                    case FuelTypes.DIESEL:
                        if((station.icons.hasOwnProperty('ДП Євро') && station.icons['ДП Євро'] !== null) || 
                        (station.icons.hasOwnProperty('ДП Prem') && station.icons['ДП Prem'] !== null)){
                            push()                        
                        }
                        break 
                    case FuelTypes.LPG:
                        if(station.icons.hasOwnProperty('Газ') && station.icons['Газ'] !== null){
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
        console.error('Amic data parsing error')
    }
    return fuel_stations
}

export default parseAmic