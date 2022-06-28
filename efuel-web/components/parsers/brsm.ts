import { Brsm, FuelTypesItem } from "../../models/brsm";
import FuelStation, { FuelTypes, isInRange, FetchParams } from "../../models/fuelStation";

const parseBrsm = (data: Brsm, params: FetchParams) => {
    const fuel_stations:Array<FuelStation> = []
    try {
        const fuelTypes = Array<FuelTypesItem>()
        switch(params.fuelType){ 
            case FuelTypes.A92:
                fuelTypes.push(...data.fuel_types.items.filter(type => {
                    return type.name.includes('92')
                }))
                break
            case FuelTypes.A95:
                fuelTypes.push(...data.fuel_types.items.filter(type => {
                    return type.name.includes('95')
                }))
                break
            case FuelTypes.DIESEL:
                fuelTypes.push(...data.fuel_types.items.filter(type => {
                    return type.name.includes('ДП') || type.name.includes('ДТ')
                }))
                break
            case FuelTypes.LPG:
                fuelTypes.push(...data.fuel_types.items.filter(type => {
                    return type.name.includes('ГАЗ') || type.name.includes('Метан')
                }))
                break
            default:
                break    
        }
        data.points.items
                .filter(station => isInRange(params.range, params.location, { lat: station.lat, lon: station.lng }))
                .filter(station => {
                    return station.fuel_types.filter(typeId => fuelTypes.find(fuelType => fuelType.id === typeId)).length
                })
                .forEach(station => {
                    const fuelStation = new FuelStation(station)
                    const fuelTypesArray = station.fuel_types.map(typeId => data.fuel_types.items.find(fuelType => fuelType.id === typeId))
                    fuelStation.fuelTypesAvailable = `Наявне пальне: ${fuelTypesArray.map(type => type?.name).join(' ')}`
                    fuel_stations.push(fuelStation)
                })

    } catch(e) {
        console.error(e)
        console.error('Brsm data parsing error')
    }
    return fuel_stations
}

export default parseBrsm