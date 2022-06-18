import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {
        const form = new FormData()
        form.append('search_map', 'go')
        form.submit('https://avias.ua/karta-azs', (err, apiResponse) => {
            if(err){
                res.status(500).end()
            }
            let data = ""
            apiResponse.on('data', chunk => data += chunk)
            apiResponse.on('end', () => {
                res.status(200).end(data)
            })            
        })
    } else {
        res.status(404).end()
    }
}