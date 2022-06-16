import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react';
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  
  const [height, setHeight] = useState(1000)
  useEffect(() => {
    if(typeof window !== 'undefined'){
      // window.addEventListener('resize', (_, e) => {
      //   console.log('set height', window.innerHeight)
      //   setHeight(window.innerHeight)
      // })

    }
  }, [window.innerHeight])  

  return (
    <div className={styles.container}>
      <MapContainer center={[49.77436, 23.9602451]} zoom={15} scrollWheelZoom={true} style={{ height }} className={styles.map} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[49.77436, 23.9602451]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
