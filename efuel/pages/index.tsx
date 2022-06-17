import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)

import FuelStation, {FuelTypes} from '../models/fuelStation'
import { fetchOkko, fetchSocar, fetchWog } from '../components/requests'

const params = {
  range: 0.4, location: { lat: 49.783382, lon: 23.9957203 }, fuelType: FuelTypes.LPG
}

const Home: NextPage = () => {

  const [stations, setStations] = useState([] as Array<FuelStation>);

  useEffect(() => {
    Promise.all([
      fetchOkko(params),
      fetchWog(params),
      fetchSocar(params)
    ])
    .then(([okko, wog, socar]) => { setStations([...okko, ...wog, ...socar]) })

  }, [])

  return <Map stations={stations}/>
}

export default Home
