import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState, Fragment } from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)
import defaultParams from '../components/defaultParams'
import FuelStation from '../models/fuelStation'
import { 
  fetchOkko, fetchSocar, fetchUkrnafta, fetchWog, 
  fetchUpg, fetchBrsm, fetchAmic, fetchShell } from '../components/requests'


const Home: NextPage = () => {

  const [range, setRange] = useState(defaultParams.RANGE_R)
  const [location, setLocation] = useState(defaultParams.LOCATION)
  const [fuelType, setFuelType] = useState(defaultParams.FUEL_TYPE)

  const [okko, setOkko] = useState([] as Array<FuelStation>)
  const [wog, setWog] = useState([] as Array<FuelStation>)
  const [socar, setSocar] = useState([] as Array<FuelStation>)
  const [ukrnafta, setUkrnafta] = useState([] as Array<FuelStation>)
  const [upg, setUpg] = useState([] as Array<FuelStation>)
  const [brsm, setBrsm] = useState([] as Array<FuelStation>)
  const [amic, setAmic] = useState([] as Array<FuelStation>)
  const [shell, setShell] = useState([] as Array<FuelStation>)

  const stations = [...okko, ...wog, ...socar, ...ukrnafta, ...upg, ...brsm, ...amic, ...shell]

  const getStations = async () => {
    const params = { range, location, fuelType }
    
    await Promise.all([
      fetchOkko(params).then(setOkko),
      fetchWog(params).then(setWog),
      fetchSocar(params).then(setSocar),
      fetchUkrnafta(params).then(setUkrnafta),
      fetchUpg(params).then(setUpg),
      fetchBrsm(params).then(setBrsm),
      // fetchAmic(params).then(setAmic),
      fetchShell(params).then(setShell)
    ])
    
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

  return (
    <Fragment>
      <Head>
        <title>єПаливо</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Map location={location} stations={stations} range={range}
              onChangeFuelType={setFuelType} 
              onChangeRange={setRange} 
              onChangeLocation={setLocation}/>
    </Fragment>)
}

export default Home
