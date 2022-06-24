import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css'

import MapControls from './mapControls'
import FuelStation, { Coordinates, FuelTypes } from '../models/fuelStation'
import { getStationMarker } from './markers'

export interface FuelMapProps {
  stations: Array<FuelStation>;
  location: Coordinates;
  range: number;
  isLoading: boolean;
  status: {message: string, progress: number};
  onChangeLocation: (location: Coordinates) => void;
  onChangeFuelType: (fuelType: FuelTypes) => void;
  onChangeRange: (newRange: number) => void;
}

const FuelMap = (props: FuelMapProps) => { 

  const routeLink = (station: FuelStation) => {
    return `https://www.google.com.ua/maps/dir/${props.location.lat},${props.location.lon}/${station.brand.toUpperCase()},${station.name},${station.address.replaceAll(' ', '+')}/@${station.location.lat},${station.location.lon}`;
  }

  const markers = props.stations.map(station => (
    <Marker key={`${station.location.lat}:${station.location.lon}`} 
            position={[station.location.lat, station.location.lon]}
            icon={getStationMarker(station.brand)}>
      <Popup className={styles.stationPopup}>
        <div className={styles.stationPopupContainer}>
          <h3>{"Назва АЗС: "}{station.brand}</h3>
          <h5>{station.name}</h5>
          <p>{"Адреса: "}{station.address}</p>
          <p><a href={routeLink(station)} target="_blank">Маршрут сюди</a></p>
          <h5>{"Інформація"}</h5>
          {station.fuelTypesAvailable}
        </div>
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