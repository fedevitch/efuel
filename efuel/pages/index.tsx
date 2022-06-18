import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)

import FuelStation, {FuelTypes} from '../models/fuelStation'
import { fetchOkko, fetchSocar, fetchUkrnafta, fetchWog } from '../components/requests'

const params = {
  range: 0.4, location: { lat: 49.783382, lon: 23.9957203 }, fuelType: FuelTypes.LPG
}

const Home: NextPage = () => {

  const [range, setRange] = useState(0.4)
  const [location, setLocation] = useState({ lat: 49.783382, lon: 23.9957203 })
  const [fuelType, setFuelType] = useState(FuelTypes.A95)

  const [stations, setStations] = useState([] as Array<FuelStation>);

  const getStations = async () => {
    const params = { range, location, fuelType }
    const [okko, wog, socar, ukrnafta] = await Promise.all([
      fetchOkko(params),
      fetchWog(params),
      fetchSocar(params),
      fetchUkrnafta(params)
    ])
    setStations([...okko, ...wog, ...socar, ...ukrnafta])
  }

  useEffect(() => {
    getStations()
  }, [])

  return <Map stations={stations}/>
}

export default Home
