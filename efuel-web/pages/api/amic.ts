import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'
import URLS from '../../components/urls'

import fs from 'fs'
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      if(req.method === 'GET') {
        try {
            return new Promise((resolve, reject) => {                
                https.get({ 
                    host: URLS.AMIC_API_HOST, 
                    path: URLS.AMIC_ENERGY_API_PATH,
                    port: 443, 
                    method: 'GET', 
                }, (apiResponse) => {
                    apiResponse.on('error', err => {
                        console.log(err)                
                        reject(err)
                    })
                    let data = ""
                    apiResponse.on('data', chunk => data += chunk)                    
                    apiResponse.on('end', () => {
                        res.status(200).end(data)               
                        resolve(200)
                    })
                    apiResponse.on('error', (e) => {
                        console.error(e)
                        reject(e)
                    })            
                })
            })
        } catch (e) {
            console.error(e)
            res.status(500).end('Error with request to Amic')
        }
      } else {
          res.status(404).end()
      }
  }