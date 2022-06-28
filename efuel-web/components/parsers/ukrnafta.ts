
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";
import { UkrnaftaStation } from "../../models/ukrnafta";

const parseUkrnafta = (data: Array<UkrnaftaStation>, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.filter(station => isInRange(params.range, params.location, {
            lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lon)
        }))
        .forEach(station => {                
            const push = () => {               
                fuel_stations.push(new FuelStation(station))
            }
            switch(params.fuelType){ 
                case FuelTypes.A92:
                    if(station.a92 !== "0.00" || station.a92e !== "0.00"){
                        push()                        
                    }
                    break               
                case FuelTypes.A95:
                    if(station.a95 !== "0.00" || station.a95e !== "0.00"){
                        push()                        
                    }
                    break
                case FuelTypes.DIESEL:
                    if(station.dt !== "0.00" || station.dte !== "0.00" ){
                        push()                        
                    }
                    break 
                case FuelTypes.LPG:
                    if(station.gas !== "0.00" ){
                        push()                        
                    }
                    break 
                default:
                    break       

            }
        })
    } catch(e) {
        console.error(e)
        console.error('Ukrnafta data parsing error')
    }
    return fuel_stations
}

export default parseUkrnafta