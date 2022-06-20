import { OkkoStation } from '../models/okko'
import { WogStation, StationStatus } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'

/* temporary imports **/
// import okko from '../../api_responses/okko gas_stations.json'
// import socar from '../../api_responses/socar stations.json'
// import wog from '../../api_responses/wog fuel_stations.json'
// import ukrnafta from '../../api_responses/ukrnafta response.json'
/* remove after adding real api calls */

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
        // const response = okko as OkkoStation // request to okko
        const res = await fetch('https://www.okko.ua/api/uk/type/gas_stations')
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
        const res = await fetch('https://api.wog.ua/fuel_stations')
        const data = (await res.json()) as WogStation
        
        const filteredStations = data.data.stations
                .filter(station => 
                    isInRange(params.range, params.location, { lat: station.coordinates.latitude, lon: station.coordinates.longitude}))
        for await (const station of filteredStations) {
            // another async request for availability here 
            try {
                const stationRes = await fetch(`https://api.wog.ua/fuel_stations/${station.id}`)
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
        const res = await fetch('https://socar.ua/api/map/stations')
        const data =  (await res.json()) as SocarStations
        
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
        } catch {
            console.error('Error while fetching data from Socar')
        }
            
    return fuel_stations        

}

export const fetchUkrnafta = async(params: FetchParams):Promise<Array<FuelStation>> => {
    const fuel_stations:Array<FuelStation> = []

    try {
        const res = await fetch('/api/ukrnafta')
        const data =  (await res.json()) as Array<UkrnaftaStation>  
        
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
