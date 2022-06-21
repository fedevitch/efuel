import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/assets/css/leaflet.css'

import MapControls from './mapControls'
import FuelStation, { Coordinates, FuelTypes, AngleLatitude, Latitude } from '../models/fuelStation'
import { getStationMarker } from './markers'

export interface FuelMapProps {
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
            position={[station.location.lat, station.location.lon]}
            icon={getStationMarker(station.brand)}>
      <Popup>
        {station.brand}<br />
        {station.name}<br />
        {station.address}<br />
        {"Інформація від АЗС:"}{station.fuelTypesAvailable}<br />
      </Popup>
    </Marker>
  ))

  return (      
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
  )
}

export default FuelMap