import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";
import { Shell, Fuel } from "../../models/shell";

const parseShell = (data: Array<Shell>, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.filter(station => !station.inactive)
        .filter(station => {
            return isInRange(params.range, params.location, { lat: station.lat, lon: station.lng })
        })
        .forEach(station => {
            const push = () => {
                const fuelStation = new FuelStation(station)                              
                fuel_stations.push(fuelStation)
            }
            switch(params.fuelType){ 
                case FuelTypes.A92:
                    if(station.fuels.includes(Fuel.LowOctaneGasoline)){
                        push()                        
                    }
                    break               
                case FuelTypes.A95:
                    if(
                        station.fuels.includes(Fuel.FuelsaveMidgradeGasoline) || 
                        station.fuels.includes(Fuel.MidgradeGasoline) ||
                        station.fuels.includes(Fuel.PremiumGasoline) ||
                        station.fuels.includes(Fuel.SuperPremiumGasoline) ){
                        push()                        
                    }
                    break   
                case FuelTypes.DIESEL:
                    if(
                        station.fuels.includes(Fuel.TruckDiesel) || 
                        station.fuels.includes(Fuel.ShellRegularDiesel) ||
                        station.fuels.includes(Fuel.PremiumDiesel) ){
                        push()                        
                    }
                    break    
                case FuelTypes.LPG:
                    if(station.fuels.includes(Fuel.AutogasLpg)){
                        push()                        
                    }
                    break 
                default:
                    break
            }
        })        
    } catch(e) {
        console.error(e)
        console.error('Shell data parsing error')
    }
    return fuel_stations
}

export default parseShell