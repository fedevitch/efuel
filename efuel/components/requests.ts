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

    const response: OkkoStation = okko as OkkoStation

    const fuel_stations:Array<FuelStation> = []
    response.collection
        .filter(station => {
            return isInRange(params.range, 
                params.location, 
                {lat: station.attributes.coordinates.lat, lon: station.attributes.coordinates.lng} as Coordinates)
        })
        .forEach(station => {
            const fuelStation = new FuelStation()
            const push = () => {
                fuelStation.fromOkko(station.attributes)
                fuel_stations.push(fuelStation)
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
                        push
                    }
                    break
                default:
                    break       

            }


        })

    return fuel_stations
}
