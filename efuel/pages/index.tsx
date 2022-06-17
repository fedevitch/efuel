import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)

import FuelStation, {FuelTypes} from '../models/fuelStation'
import { fetchOkko } from '../components/requests'

const params = {
  range: 2, location: { lat: 49.7743, lon: 23.9602451 }, fuelType: FuelTypes.A95
}

const Home: NextPage = () => {

  const [stations, setStations] = useState([] as Array<FuelStation>);

  useEffect(() => {
    Promise.all([fetchOkko(params)])
    .then(([okko]) => { setStations([...okko]) })

  }, [])

  return <Map stations={stations}/>
}

export default Home
