import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      if(req.method === 'GET') {
        return new Promise((resolve, reject) => {
          https.get('https://upg.ua/merezha_azs/', (apiResponse) => {
            apiResponse.on('error', err => {
                res.status(500).end('Error with request to Upg')
                reject(err)
            })
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