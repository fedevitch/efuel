import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";
import { Motto } from "../../models/motto";

const parseMotto = (data: Motto, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.markers.marker
            .filter(marker => isInRange(params.range, params.location, { lat: Number.parseFloat(marker.lat), lon: Number.parseFloat(marker.lng) }))
            .forEach(marker => {
                const push = () => {
                    const fuelStation = new FuelStation(marker)                              
                    fuel_stations.push(fuelStation)
                }

                switch(params.fuelType){ 
                    case FuelTypes.A92:
                        if(marker.toplivo.includes('А92')){
                            push()                        
                        }
                        break               
                    case FuelTypes.A95:
                        if(marker.toplivo.includes('А95')){
                            push()                        
                        }
                        break   
                    case FuelTypes.DIESEL:
                        if(marker.toplivo.includes('ДП')){
                            push()                        
                        }
                        break    
                    case FuelTypes.LPG:
                        if(marker.toplivo.includes('Газ')){
                            push()                        
                        }
                        break 
                    default:
                        break
                }
            })        
    } catch(e) {
        console.error(e)
        console.error('Motto data parsing error')
    }
    return fuel_stations;
}

export default parseMotto;