import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import FuelStation, { Coordinates, FuelTypes, AngleLatitude, Latitude } from '../models/fuelStation'
import { useEffect } from 'react'

interface FuelMapProps {
  stations: Array<FuelStation>;
  location: Coordinates;
  range: number;
  onChangeLocation: (location: Coordinates) => void;
  onChangeFuelType: (fuelType: FuelTypes) => void;
  onChangeRange: (newRange: number) => void;
}

const FuelMap = (props: FuelMapProps) => { 

  const markers = props.stations.map(station => (
    <Marker key={`${station.location.lat}:${station.location.lon}`} 
            position={[station.location.lat, station.location.lon]}>
      <Popup>
        {station.brand}<br />
        {station.name}<br />
        {station.address}<br />
        {"Доступні види палива:"}{station.fuelTypesAvailable}<br />
      </Popup>
    </Marker>
  ))

  return (
    <div className={styles.container}>
      <title>ЄПаливо</title>
      <MapContainer center={[props.location.lat,props.location.lon]} zoom={14} scrollWheelZoom={true} className={styles.map} >
        <MapControls {...props} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution='&copy; <a href="mailto:boromir.hawk@gmail.com">Lyubomyr</a>'
          url=""
        />
        {markers}
      </MapContainer>
    </div>
  )
}

const MapControls = (props: FuelMapProps) => {
  const map = useMap()

  useEffect(() => {
    map.setView([props.location.lat, props.location.lon])
  }, [props.location.lat, props.location.lon])

  const createFuelSelector = () => {
    const FuelSelector = L.Control.extend({
      onAdd: () => {
        const fuelSelect = L.DomUtil.create('select', styles.fuelSelect)
        fuelSelect.options.add(new Option('A95', FuelTypes.A95))
        fuelSelect.options.add(new Option('Дизпаливо', FuelTypes.DIESEL))
        fuelSelect.options.add(new Option('Газ', FuelTypes.LPG))
        fuelSelect.options.add(new Option('A92', FuelTypes.A92))
        fuelSelect.addEventListener('change', () => props.onChangeFuelType(fuelSelect.value as FuelTypes))

        return fuelSelect
      }
    })

    return new FuelSelector({ position: 'topleft' })
  }

  const createRangeInput = () => {
    const RangeInput = L.Control.extend({
      onAdd: () => {
        const rangeInput = L.DomUtil.create('input', styles.rangeInput)
        rangeInput.type = 'number'
        rangeInput.value = Latitude(props.range).toString()
        rangeInput.addEventListener('change', 
                                    () => props.onChangeRange(AngleLatitude(Number.parseFloat(rangeInput.value))))
        
                                    return rangeInput
      }
    })

    return new RangeInput({ position: 'topleft' })
  }

  useEffect(() => {
    const fuelSelector = createFuelSelector()
    fuelSelector.addTo(map)
    const rangeInput = createRangeInput()    
    rangeInput.addTo(map)
  }, [])

  return null
}

export default FuelMap
