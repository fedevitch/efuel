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
            https.get(URLS.CHIPO_API, (apiResponse) => {
              apiResponse.on('error', err => {
                console.error(err)                
                reject(err)
              })
              let responseText = ""
              apiResponse.on('data', chunk => responseText += chunk)
              apiResponse.on('end', () => {                
                const start = 'var maplistScriptParamsKo = '
                const end = '<script type="text/javascript"'
                const data = responseText
                              .substring(
                                responseText.lastIndexOf(start) + start.length, 
                                responseText.lastIndexOf(end) - 11)
                                .replace(';', '')
                res.status(200).end(data)                
                resolve(200)
              })
              apiResponse.on('error', reject)            
            })
          })
        } catch(e) {
          console.error(e)
          res.status(500).end('Error with request to Chipo')
        }
      } else {
          res.status(404).end()
      }
  }