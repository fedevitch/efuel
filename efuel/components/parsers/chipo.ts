import { Chipo } from "../../models/chipo";
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";

const parseChipo = (data: Chipo, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {

    data.KOObject[0].locations
        .filter(station => isInRange(params.range, params.location, { 
            lat: Number.parseFloat(station.latitude),
            lon: Number.parseFloat(station.longitude)
         }))
        .forEach(station => {
            const push = () => {
                const fuelStation = new FuelStation(station)                              
                fuel_stations.push(fuelStation)
            }

            switch(params.fuelType){ 
                case FuelTypes.A92:
                    if(station.description.includes('92.png')){
                        push()                        
                    }
                    break               
                case FuelTypes.A95:
                    if(station.description.includes('95.png')){
                        push()                        
                    }
                    break   
                case FuelTypes.DIESEL:
                    if(station.description.includes('dp.png')){
                        push()                        
                    }
                    break    
                case FuelTypes.LPG:
                    if(station.description.includes('gas.png')){
                        push()                        
                    }
                    break 
                default:
                    break
            }
        })
    } catch(e) {
        console.error(e)
        console.error('Chipo data parsing error')
    }
    
    return fuel_stations
}

export default parseChipo