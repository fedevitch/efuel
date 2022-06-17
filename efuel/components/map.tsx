import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react';
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'

import FuelStation from '../models/fuelStation'

interface FuelMapProps {
  stations: Array<FuelStation>
}

const FuelMap = (props: FuelMapProps) => {
  
  const markers = props.stations.map(station => (
    <Marker key={`${station.location.lat}:${station.location.lon}`} position={[station.location.lat, station.location.lon]}>
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
      <MapContainer center={[49.783382,23.9957203]} zoom={12} scrollWheelZoom={true} className={styles.map} >
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

export default FuelMap
