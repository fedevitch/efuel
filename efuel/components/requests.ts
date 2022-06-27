import { OkkoStation } from '../models/okko'
import { WogStation, StationStatus } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'
import { Upg, UpgFuels } from '../models/upg'
import { Brsm, FuelTypesItem } from '../models/brsm'
import { Amic } from '../models/amic'
import { Shell, Fuel as ShellFuelType } from '../models/shell'

import { Marker, Motto } from '../models/motto'
import { parseStringPromise } from 'xml2js'

import URLS from './urls'
import FuelStation, {FuelTypes, Coordinates} from '../models/fuelStation'

export interface FetchParams {
    range: number,
    location: Coordinates, 
    fuelType: FuelTypes
}

export const isInRange = (range:number, point1: Coordinates, point2: Coordinates):boolean => {
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
        const upgData = (await res.json()) as Upg

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

export const fetchAmic = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.AMIC)
        const amicData = (await res.json()) as Amic

        for(const [stationName, station] of Object.entries(amicData)){
            if(isInRange(params.range, params.location, { lat: Number.parseFloat(station.lat), lon: Number.parseFloat(station.lng) })) {
                const push = () => {
                    const fuelStation = new FuelStation(station)
                    fuelStation.name = stationName               
                    fuel_stations.push(fuelStation)
                }
                switch(params.fuelType){ 
                    case FuelTypes.A92:
                        if(station.icons.hasOwnProperty('92 Євро') && station.icons['92 Євро'] !== null){
                            push()                        
                        }
                        break               
                    case FuelTypes.A95:
                        if((station.icons.hasOwnProperty('95 Євро') && station.icons['95 Євро'] !== null) || 
                           (station.icons.hasOwnProperty('95 Prem') && station.icons['95 Prem'] !== null)){
                            push()                        
                        }
                        break
                    case FuelTypes.DIESEL:
                        if((station.icons.hasOwnProperty('ДП Євро') && station.icons['ДП Євро'] !== null) || 
                           (station.icons.hasOwnProperty('ДП Prem') && station.icons['ДП Prem'] !== null)){
                            push()                        
                        }
                        break 
                    case FuelTypes.LPG:
                        if(station.icons.hasOwnProperty('Газ') && station.icons['Газ'] !== null){
                            push()                        
                        }
                        break  
                    default:
                        break
                }
            }
        }
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Amic')
    }
    return fuel_stations
}

export const fetchShell = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(`${URLS.SHELL}?lat=${params.location.lat}&lng=${params.location.lon}`)
        const shellStations = (await res.json()) as Array<Shell>

        shellStations
        .filter(station => !station.inactive)
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
                    if(station.fuels.includes(ShellFuelType.LowOctaneGasoline)){
                        push()                        
                    }
                    break               
                case FuelTypes.A95:
                    if(
                        station.fuels.includes(ShellFuelType.FuelsaveMidgradeGasoline) || 
                        station.fuels.includes(ShellFuelType.MidgradeGasoline) ||
                        station.fuels.includes(ShellFuelType.PremiumGasoline) ||
                        station.fuels.includes(ShellFuelType.SuperPremiumGasoline) ){
                        push()                        
                    }
                    break   
                case FuelTypes.DIESEL:
                    if(
                        station.fuels.includes(ShellFuelType.TruckDiesel) || 
                        station.fuels.includes(ShellFuelType.ShellRegularDiesel) ||
                        station.fuels.includes(ShellFuelType.PremiumDiesel) ){
                        push()                        
                    }
                    break    
                case FuelTypes.LPG:
                    if(station.fuels.includes(ShellFuelType.AutogasLpg)){
                        push()                        
                    }
                    break 
                default:
                    break
            }
        })
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Shell')
    }
    return fuel_stations
}

export const fetchMotto = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch(URLS.MOTTO)
        const resXml = await res.text()
        const mottoStations = (await parseStringPromise(resXml, { mergeAttrs: true, explicitArray: false })) as Motto

        mottoStations.markers.marker
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
        console.log(e)
        console.error('Error while fetching data from Motto')
    }
    return fuel_stations
}

