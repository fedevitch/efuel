import { Upg, UpgFuels } from "../../models/upg";
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";

const parseUpg = (data: Upg, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        data.data
        .filter(s => s.Active)
        .filter(s => isInRange(params.range, params.location, { lat: Number.parseFloat(s.Latitude), lon: Number.parseFloat(s.Longitude) }))
        .filter(s => {
            const A92 = s.FuelsAsArray.find(f => f.id === UpgFuels.A92)
            const A95 = s.FuelsAsArray.find(f => f.id === UpgFuels.A95)
            const Upg95 = s.FuelsAsArray.find(f => f.id === UpgFuels.upg95)
            const Diesel = s.FuelsAsArray.find(f => f.id === UpgFuels.DIESEL)
            const UpgDP = s.FuelsAsArray.find(f => f.id === UpgFuels.upgDP)
            const LPG = s.FuelsAsArray.find(f => f.id === UpgFuels.LPG)
            switch(params.fuelType){ 
                case FuelTypes.A92:
                    return (A92 && A92.Price !== "0.00")
                case FuelTypes.A95:
                    return (A95 && A95.Price !== "0.00") || (Upg95 && Upg95.Price !== "0.00")
                case FuelTypes.DIESEL:
                    return (Diesel && Diesel.Price !== "0.00") || (UpgDP && UpgDP.Price !== "0.00")
                case FuelTypes.LPG:
                    return (LPG && LPG.Price !== "0.00") 
                default:
                    break    
            }
        })
        .forEach(s => fuel_stations.push(new FuelStation(s)))

    } catch(e) {
        console.error(e)
        console.error('Upg data parsing error')
    }
    return fuel_stations
}

export default parseUpg