import type { NextApiRequest, NextApiResponse } from 'next'
// import FormData from 'form-data'
// import URLS from '../../components/urls'

import ukrnafta_response from '../../models/ukrnafta response.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {
        // try {
        //     return new Promise((resolve, reject) => {
        //         const form = new FormData()
        //         form.append('search_map', 'go')
        //         form.submit(URLS.UKRNAFTA_API, (err, apiResponse) => {
        //             if(err){                    
        //                 reject(err)
        //             }
        //             let data = ""
        //             apiResponse.on('data', chunk => data += chunk)
        //             apiResponse.on('end', () => {
        //                 res.status(200).end(data)
        //                 resolve(200)
        //             })
        //             apiResponse.on('error', reject)                                
        //         })
        //     })
        // } catch(e) {
        //     console.error(e)
        //     res.status(500).end('Error with request to Ukrnafta')
        // }
        res.status(200).end(JSON.stringify(ukrnafta_response)) // api from outside was very slow, return cached data
    } else {
        res.status(404).end()
    }
}