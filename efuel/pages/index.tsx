import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)
import FuelStation, {Coordinates, FuelTypes} from '../models/fuelStation'
import { fetchOkko, fetchSocar, fetchUkrnafta, fetchWog } from '../components/requests'


const Home: NextPage = () => {

  const [range, setRange] = useState(0.044988888)
  const [location, setLocation] = useState({ lat: 50.783382, lon: 25.9957203 } as Coordinates)
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
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude })
      })
    }
  }, [])

  useEffect(() => {    
    getStations()
  }, [range, location.lat, location.lon, fuelType])

  return <Map location={location} stations={stations} range={range}
              onChangeFuelType={setFuelType} 
              onChangeRange={setRange} 
              onChangeLocation={setLocation}/>
}

export default Home
