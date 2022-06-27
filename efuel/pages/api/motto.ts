import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'
import URLS from '../../components/urls'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      if(req.method === 'GET') {
        try {
          return new Promise((resolve, reject) => {
            https.get(URLS.MOTTO_API, (apiResponse) => {
              apiResponse.on('error', err => {          
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
        } catch(e) {
          console.error(e)
          res.status(500).end('Error with request to Motto')
        }
      } else {
          res.status(404).end()
      }
  }