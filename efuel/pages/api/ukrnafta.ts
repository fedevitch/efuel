import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import URLS from '../../components/urls'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {
        return new Promise((resolve, reject) => {
            const form = new FormData()
            form.append('search_map', 'go')
            form.submit(URLS.UKRNAFTA_API, (err, apiResponse) => {
                if(err){
                    res.status(500).end('Error with request to Ukrnafta')
                    reject(err)
                }
                let data = ""
                apiResponse.on('data', chunk => data += chunk)
                apiResponse.on('end', () => {
                    res.status(200).end(data)
                    resolve(200)
                })            
            })
        })
    } else {
        res.status(404).end()
    }
}