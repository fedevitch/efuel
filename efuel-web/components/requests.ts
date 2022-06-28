import { OkkoStation } from '../models/okko'
import { WogStation, StationStatus } from '../models/wog'
import { UkrnaftaStation } from '../models/ukrnafta'
import { SocarStations } from '../models/socar'
import { Upg } from '../models/upg'
import { Brsm } from '../models/brsm'
import { Amic } from '../models/amic'
import { Shell } from '../models/shell'
import { Motto } from '../models/motto'
import { Chipo } from '../models/chipo'

import parseChipo from './parsers/chipo'
import parseMotto from './parsers/motto'
import parseShell from './parsers/shell'
import parseAmic from './parsers/amic'
import parseBrsm from './parsers/brsm'
import parseSocar from './parsers/socar'
import parseUkrnafta from './parsers/ukrnafta'
import parseWog, {filterWogStations} from './parsers/wog'
import parseOkko from './parsers/okko'
import parseUpg from './parsers/upg'

import URLS from './urls'
import FuelStation, {FetchParams} from '../models/fuelStation'
import { parseStringPromise } from 'xml2js'

export const fetchOkko = async (params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.OKKO)
        const data =  (await res.json()) as OkkoStation

        return parseOkko(data, params)
    } catch {
        console.error('Error while fetching data from OKKO')
        return Array<FuelStation>()
    }
}

export const fetchWog = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.WOG)
        const data = (await res.json()) as WogStation
        
        const filteredStations = filterWogStations(data, params)
        const statuses = Array<StationStatus>()
        for await (const station of filteredStations) {
            // another async request for availability here 
            try {
                const stationRes = await fetch(`${URLS.WOG_STATION}${station.id}`)
                const stationData = (await stationRes.json()) as StationStatus
                statuses.push(stationData)               
            } catch {
                console.error(`Error while fetching data from WOG station ${station.id}`)
            }
        }
        return parseWog(filteredStations, statuses, params)
    } catch {
        console.error('Error while fetching data from WOG')
        return Array<FuelStation>()
    }
}

export const fetchSocar = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.SOCAR)
        const socarData =  (await res.json()) as SocarStations
        
        return parseSocar(socarData, params)
    } catch {
        console.error('Error while fetching data from Socar')
        return Array<FuelStation>()
    }
}

export const fetchUkrnafta = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.UKRNAFTA)
        const data = (await res.json()) as Array<UkrnaftaStation>  
        
        return parseUkrnafta(data, params)
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Ukrnafta')
        return Array<FuelStation>()
    }
}

export const fetchUpg = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.UPG)
        const upgData = (await res.json()) as Upg

        return parseUpg(upgData, params)
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Upg')
        return Array<FuelStation>()
    }
}

export const fetchBrsm = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.BRSM)
        const brsmData = (await res.json()) as Brsm

        return parseBrsm(brsmData, params)

    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Brsm')
        return Array<FuelStation>()
    }
}

export const fetchAmic = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.AMIC)
        const amicData = (await res.json()) as Amic

        return parseAmic(amicData, params)
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Amic')
        return Array<FuelStation>()
    }
}

export const fetchShell = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(`${URLS.SHELL}?lat=${params.location.lat}&lng=${params.location.lon}`)
        const shellStations = (await res.json()) as Array<Shell>

        return parseShell(shellStations, params)       
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Shell')
        return Array<FuelStation>()
    }
}

export const fetchMotto = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.MOTTO)
        const resXml = await res.text()
        const mottoStations = (await parseStringPromise(resXml, { mergeAttrs: true, explicitArray: false })) as Motto

        return parseMotto(mottoStations, params)
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Motto')
        return Array<FuelStation>()
    }
}

export const fetchChipo = async(params: FetchParams):Promise<Array<FuelStation>> => {
    try {
        const res = await fetch(URLS.CHIPO)
        const data = (await res.json()) as Chipo

        return parseChipo(data, params)
    } catch(e) {
        console.log(e)
        console.error('Error while fetching data from Chipo')
        return Array<FuelStation>()
    }
}
