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
  fetchUpg, fetchBrsm, fetchAmic, fetchShell, fetchMotto, fetchChipo } from '../components/requests'


const Home: NextPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("Готово")
  const [progress, setProgress] = useState(0)

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
  const [motto, setMotto] = useState([] as Array<FuelStation>)
  const [chipo, setChipo] = useState([] as Array<FuelStation>)

  const stations = [...okko, ...wog, ...socar, ...ukrnafta, ...upg, ...brsm, ...amic, ...shell, ...motto, ...chipo]
  const stationsUnflattened = [okko, wog, socar, ukrnafta, upg, brsm, amic, shell, motto, chipo]

  const getStationData = async (getter: Promise<Array<FuelStation>>, statusStart: string, statusEnd: string): Promise<Array<FuelStation>> => {
    setStatus(statusStart)
    const fuelStations = await getter
    setStatus(statusEnd)
    return fuelStations
  }

  const getStations = async () => {
    const params = { range, location, fuelType }
    setIsLoading(true)
    setProgress(0)
    await Promise.all([
      getStationData(fetchOkko(params), "Дзвонимо на ОККО", "OKKO: Готово").then(setOkko),
      getStationData(fetchWog(params), "Питаємся у WOG", "WOG: Готово").then(setWog),
      getStationData(fetchSocar(params), "Набираємо Socar", "Socar: Готово").then(setSocar),
      getStationData(fetchUkrnafta(params), "Завантажується Укрнафта", "Укрнафта завантажилась").then(setUkrnafta),
      getStationData(fetchUpg(params), "Йдемо до Upg", "Upg - Є!").then(setUpg),
      getStationData(fetchBrsm(params), "Качаємо в БРСМ-Нафта", "БРСМ-Нафта скачалась").then(setBrsm),
      getStationData(fetchAmic(params), "AMIC - старт", "AMIC - готово").then(setAmic),
      getStationData(fetchShell(params), "Calling Shell", "Shell - OK").then(setShell),
      getStationData(fetchMotto(params), "Мотто: врум-врумм", "Мотто ОК").then(setMotto),
      getStationData(fetchChipo(params), "Чіпаємо Chipo", "Chipo - OK").then(setChipo)
    ])
    setIsLoading(false) 
    setStatus("Готово")
    setProgress(100)
  }

  useEffect(() => {
    const value = progress + 100/(stationsUnflattened.length)
    setProgress(value > 100 ? 100 : value)
  }, [stations.length])

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />        
        {PWAHeadMeta}
      </Head>
      <Map location={location} stations={stations} range={range} isLoading={isLoading} status={{message: status, progress}}
              onChangeFuelType={setFuelType} 
              onChangeRange={setRange} 
              onChangeLocation={setLocation}/>
    </Fragment>)
}

export default Home

const PWAHeadMeta = (
  <Fragment>
    <meta name='application-name' content='єПаливо' />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
    <meta name='apple-mobile-web-app-title' content='єПаливо' />
    <meta name='description' content='Швидко дізнатися яке паливо у наявності поблизу' />
    <meta name='format-detection' content='telephone=no' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='msapplication-config' content='/icons/browserconfig.xml' />
    <meta name='msapplication-TileColor' content='#2B5797' />
    <meta name='msapplication-tap-highlight' content='no' />
    <meta name='theme-color' content='#000000' />

    <link rel='apple-touch-icon' href='/efuel.png' />
    <link rel='apple-touch-icon' sizes='152x152' href='/efuel.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='/efuel.png' />
    <link rel='apple-touch-icon' sizes='167x167' href='/efuel.png' />

    <link rel='icon' type='image/png' sizes='32x32' href='/efuel.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/efuel.png' />
    <link rel='manifest' href='/manifest.json' />
    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
    <link rel='shortcut icon' href='/favicon.ico' />
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        
    <meta property='og:type' content='website' />
    <meta property='og:title' content='єПаливо' />
    <meta property='og:description' content='Перевірити наявність палива поблизу' />
    <meta property='og:site_name' content='єПаливо' />
  </Fragment>
)
