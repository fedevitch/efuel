import { OkkoStation } from '../models/okko'
import { WogStation, StationStatus } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'
import { Upg, UpgFuels } from '../models/upg'
import { Brsm, FuelTypesItem } from '../models/brsm'
import { Amic } from '../models/amic'
import { Shell } from '../models/shell'

import URLS from './urls'
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
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.OKKO)
        const data =  (await res.json()) as OkkoStation

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
    } catch {
        console.error('Error while fetching data from OKKO')
    }

    return fuel_stations
}

export const fetchWog = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        // const response = wog as WogStation // request to wog
        const res = await fetch(URLS.WOG)
        const data = (await res.json()) as WogStation
        
        const filteredStations = data.data.stations
                .filter(station => 
                    isInRange(params.range, params.location, { lat: station.coordinates.latitude, lon: station.coordinates.longitude}))
        for await (const station of filteredStations) {
            // another async request for availability here 
            try {
                const stationRes = await fetch(`${URLS.WOG_STATION}${station.id}`)
                const stationData = (await stationRes.json()) as StationStatus

                const { workDescription } = stationData.data
                const push = () => {
                    const fuelStation = new FuelStation(station)
                    fuelStation.fuelTypesAvailable = workDescription
                    fuel_stations.push(fuelStation)
                }            
                switch(params.fuelType){                               
                    case FuelTypes.A95:
                        if(workDescription.includes('М95 - Готівка') || workDescription.includes('A95 - Готівка')){
                            push()                        
                        }
                        break
                    case FuelTypes.DIESEL:
                        if(workDescription.includes('МДП+ - Готівка') || workDescription.includes('ДП - Готівка')){
                            push()                        
                        }
                        break 
                    case FuelTypes.LPG:
                        if(workDescription.includes('ГАЗ - Готівка')){
                            push()                        
                        }
                        break 
                    default:
                        break
                }
            } catch {
                console.error(`Error while fetching data from WOG station ${station.id}`)
            }
        }
    } catch {
        console.error('Error while fetching data from WOG')
    }
    return fuel_stations
}

export const fetchSocar = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        // const response =  socar as SocarStations
        const res = await fetch(URLS.SOCAR)
        const socarData =  (await res.json()) as SocarStations
        
        socarData.data
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
        } catch {
            console.error('Error while fetching data from Socar')
        }
            
    return fuel_stations        

}

export const fetchUkrnafta = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.UKRNAFTA)
        const data = (await res.json()) as Array<UkrnaftaStation>  
        
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
        console.log(e)
        console.error('Error while fetching data from Ukrnafta')
    }

    return fuel_stations
}

export const fetchUpg = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.UPG)
        const responseText = await res.text()
        const rawData = responseText.substring(responseText.indexOf('var objmap = ') + 13, responseText.indexOf('var map;')).replace(';', '')

        const upgData = JSON.parse(rawData) as Upg

        upgData.data
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
        console.log(e)
        console.error('Error while fetching data from Upg')
    }
    return fuel_stations
}

export const fetchBrsm = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.BRSM)
        const brsmData = (await res.json()) as Brsm

        const fuelTypes = Array<FuelTypesItem>()
        switch(params.fuelType){ 
            case FuelTypes.A92:
                fuelTypes.push(...brsmData.fuel_types.items.filter(type => {
                    return type.name.includes('92')
                }))
                break
            case FuelTypes.A95:
                fuelTypes.push(...brsmData.fuel_types.items.filter(type => {
                    return type.name.includes('95')
                }))
                break
            case FuelTypes.DIESEL:
                fuelTypes.push(...brsmData.fuel_types.items.filter(type => {
                    return type.name.includes('ДП') || type.name.includes('ДТ')
                }))
                break
            case FuelTypes.LPG:
                fuelTypes.push(...brsmData.fuel_types.items.filter(type => {
                    return type.name.includes('ГАЗ') || type.name.includes('Метан')
                }))
                break
            default:
                break    
        }
        brsmData.points.items
                .filter(station => isInRange(params.range, params.location, { lat: station.lat, lon: station.lng }))
                .filter(station => {
                    return station.fuel_types.filter(typeId => fuelTypes.find(fuelType => fuelType.id === typeId)).length
                })
                .forEach(station => {
                    const fuelStation = new FuelStation(station)
                    const fuelTypesArray = station.fuel_types.map(typeId => brsmData.fuel_types.items.find(fuelType => fuelType.id === typeId))
                    fuelStation.fuelTypesAvailable = `Наявне пальне: ${fuelTypesArray.map(type => type?.name).join(' ')}`
                    fuel_stations.push(fuelStation)
                })

    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Brsm')
    }
    return fuel_stations
}
