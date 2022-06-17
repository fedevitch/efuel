import { OkkoStation } from '../models/okko'
import { WogStation } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'

/* temporary imports **/
import okko from '../../api_responses/okko gas_stations.json'
import socar from '../../api_responses/socar stations.json'
import wog from '../../api_responses/wog fuel_stations.json'
import ukrnafta from '../../api_responses/ukrnafta response.json'
/* remove after adding real api calls */

import FuelStation, {FuelTypes, Coordinates} from '../models/fuelStation'

interface FetchParams {
    range: number,
    location: Coordinates, 
    fuelType: FuelTypes
}

const isInRange = (range:number, point1: Coordinates, point2: Coordinates):boolean => {
    const distance = Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lon - point2.lon, 2))
    return range >= distance
}

export const fetchOkko = async (params: FetchParams):Promise<Array<FuelStation>> => {

    const response = okko as OkkoStation // request to okko

    const fuel_stations:Array<FuelStation> = []
    response.collection
        .filter(station => {
            return isInRange(params.range, 
                params.location, 
                {lat: station.attributes.coordinates.lat, lon: station.attributes.coordinates.lng} as Coordinates)
        })
        .forEach(station => {
            const push = () => {                
                fuel_stations.push(new FuelStation(station.attributes))
            }
            switch(params.fuelType){                
                case FuelTypes.A95:
                    if(station.attributes.a95_evro_tip_oplati || station.attributes.pulls95_tip_oplati){
                        push()                        
                    }
                    break
                case FuelTypes.DIESEL:
                    if(station.attributes.dp_evro_tip_oplati || station.attributes.pullsdiesel_tip_oplati) {
                        push()                        
                    }
                    break 
                case FuelTypes.A92:
                    if(station.attributes.a92_evro_tip_oplati){
                        push()
                    }
                    break
                case FuelTypes.LPG:
                    if(station.attributes.gas_tip_oplati){
                        push()
                    }
                    break    
                default:
                    break       

            }
        })

    return fuel_stations
}

export const fetchWog = async(params: FetchParams) => {
    const response = wog as WogStation // request to wog
    const fuel_stations:Array<FuelStation> = []

    response.data.stations
            .filter(station => 
                isInRange(params.range, params.location, { lat: station.coordinates.latitude, lon: station.coordinates.longitude}))
            .forEach(station => {
                // another async request for availability here 
                fuel_stations.push(new FuelStation(station))
            })

    return fuel_stations
}

export const fetchSocar = async(params: FetchParams) => {
    const response = socar as SocarStations
    const fuel_stations:Array<FuelStation> = []

    response.data
            .filter(station => 
                isInRange(params.range, params.location, { lat: station.attributes.marker.lat, lon: station.attributes.marker.lng }))
            .forEach(station => {                
                const push = () => {               
                    fuel_stations.push(new FuelStation(station.attributes))
                }
                switch(params.fuelType){                
                    case FuelTypes.A95:
                        if(station.attributes.fuelPrices.some(price => price.includes('NANO 95') || price.includes('A95'))){
                            push()                        
                        }
                        break
                    case FuelTypes.DIESEL:
                        if(station.attributes.fuelPrices.some(price => price.includes('NANO ДП') || price.includes('Diesel'))){
                            push()                        
                        }
                        break 
                    case FuelTypes.LPG:
                        if(station.attributes.fuelPrices.some(price => price.includes('LPG'))){
                            push()                        
                        }
                        break 
                    default:
                        break       
    
                }
            })
            
    return fuel_stations        

}
