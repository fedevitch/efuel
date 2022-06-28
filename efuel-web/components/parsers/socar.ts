
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";
import { SocarStations } from "../../models/socar";

const parseSocar = (data: SocarStations, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.data
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
    } catch(e) {
        console.error(e)
        console.error('Socar data parsing error')
    }
    return fuel_stations
}

export default parseSocar