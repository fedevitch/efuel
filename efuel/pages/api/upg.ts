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
            https.get(URLS.UPG_API, (apiResponse) => {
              apiResponse.on('error', err => {                
                  reject(err)
              })
              let responseText = ""
              apiResponse.on('data', chunk => responseText += chunk)
              apiResponse.on('end', () => {
                const data = responseText
                              .substring(
                                responseText.indexOf('var objmap = ') + 13, 
                                responseText.indexOf('var map;'))
                                .replace(';', '')
                res.status(200).end(data)                
                resolve(200)
              })            
            })
          })
        } catch(e) {
          console.error(e)
          res.status(500).end('Error with request to Upg')
        }
      } else {
          res.status(404).end()
      }
  }