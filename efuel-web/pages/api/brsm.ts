import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import URLS from '../../components/urls'

const callAjaxHandler = (action: string):Promise<string> => new Promise((resolve, reject) => {            
    const formGetTypes = new FormData()
    formGetTypes.append('action', action)
    formGetTypes.append('lang', 'uk')
    formGetTypes.submit(URLS.BRSM_API, (err, apiResponse) => {
        if(err){            
            reject(err)
        }
        let data = ""
        apiResponse.on('data', chunk => data += chunk)
        apiResponse.on('end', () => {            
            resolve(data)
        })
        apiResponse.on('error', reject)            
    })
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {       
        try {
            const fuel_types = JSON.parse(await callAjaxHandler('get_map_fuel_types'))
            // const services = await callAjaxHandler('get_map_services')
            const points = JSON.parse(await callAjaxHandler('get_maps_points'))
            res.status(200).json({ fuel_types, points })
        } catch(e) {
            console.error(e)
            res.status(500).end('Error with request to Brsm')
        }
    } else {
        res.status(404).end()
    }
}