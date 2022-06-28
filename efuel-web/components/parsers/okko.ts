import FuelStation, { FuelTypes, isInRange, FetchParams, Coordinates } from "../../models/fuelStation";
import { OkkoStation } from "../../models/okko";

const parseOkko = (data: OkkoStation, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.collection
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
    } catch(e) {
        console.error(e)
        console.error('Okko data parsing error')
    }
    return fuel_stations
}

export default parseOkko