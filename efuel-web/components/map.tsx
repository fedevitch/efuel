import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/assets/css/leaflet.css'

import FuelStation, { Coordinates, FuelTypes, AngleLatitude, Latitude, Brands } from '../models/fuelStation'
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
            position={[station.location.lat, station.location.lon]}
            icon={getStationMarker(station.brand)}>
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

  const provider = new OpenStreetMapProvider()

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    marker: {
      icon: new L.Icon.Default(),
      draggable: true
    },
    searchLabel: 'Пошук місця'
  } as any)
  // @ts-ignore
  map.on('geosearch/showlocation', (event) => props.onChangeLocation({ lat: event.location.y, lon: event.location.x })) 

  const createFuelSelector = () => {
    const FuelSelector = L.Control.extend({
      onAdd: () => {        
        const fuelSelect = L.DomUtil.create('select', styles.fuelSelect)
        fuelSelect.id = 'fuelSelect'
        fuelSelect.options.add(new Option('A95', FuelTypes.A95))
        fuelSelect.options.add(new Option('Дизпаливо', FuelTypes.DIESEL))
        fuelSelect.options.add(new Option('Газ', FuelTypes.LPG))
        fuelSelect.options.add(new Option('A92', FuelTypes.A92))
        fuelSelect.addEventListener('change', () => props.onChangeFuelType(fuelSelect.value as FuelTypes))

        const container = L.DomUtil.create('div', styles.controlContainer)
        const label = L.DomUtil.create('label')
        label.setAttribute('for', 'fuelSelect')
        label.innerText = 'Тип палива'
        container.append(label)
        container.append(fuelSelect)        

        return container
      }
    })

    return new FuelSelector({ position: 'topleft' })
  }

  const createRangeInput = () => {
    const RangeInput = L.Control.extend({
      onAdd: () => {
        const rangeInput = L.DomUtil.create('input', styles.rangeInput)
        rangeInput.type = 'number'
        rangeInput.max = '20'
        rangeInput.min = '1'
        rangeInput.value = Latitude(props.range).toString()
        rangeInput.addEventListener('change', 
                                    () => props.onChangeRange(AngleLatitude(Number.parseFloat(rangeInput.value))))
        
        const container = L.DomUtil.create('div', styles.controlContainer)
        const label = L.DomUtil.create('label')
        label.setAttribute('for', 'fuelSelect')
        label.innerText = 'Радіус пошуку'
        container.append(label)
        container.append(rangeInput)        

        return container
      }
    })

    return new RangeInput({ position: 'topleft' })
  }

  useEffect(() => {
    map.setView([props.location.lat, props.location.lon])
  }, [props.location.lat, props.location.lon])

  useEffect(() => {
    map.addControl(searchControl)
    const fuelSelector = createFuelSelector()
    fuelSelector.addTo(map)
    const rangeInput = createRangeInput()    
    rangeInput.addTo(map)    
  }, [])

  return null
}

const okkoMarker = new L.Icon({
    iconUrl: 'okko-pin.png',
    iconRetinaUrl: 'okko-pin.png',
    iconSize: new L.Point(29, 38),
    iconAnchor: new L.Point(25, 40),
    shadowUrl: 'marker-shadow.png',
    shadowAnchor: new L.Point(20, 40),
    popupAnchor: new L.Point(-10, -10)
})

const wogMarker = new L.Icon({
    iconUrl: 'wog-favicon-32x32.png',
    iconRetinaUrl: 'wog-icon.png',
    iconSize: new L.Point(32, 32),
    shadowUrl: 'marker-shadow.png',
    shadowAnchor: new L.Point(15, 25)
})

const socarMarker = new L.Icon({
    iconUrl: 'socar-map-marker.svg',
    iconRetinaUrl: 'socar-map-marker.svg',
    iconSize: new L.Point(23, 30),
    shadowUrl: 'marker-shadow.png',
    shadowAnchor: new L.Point(14, 22)
})

const ukrnaftaMarker = new L.Icon({
  iconUrl: 'ukrnafta_marker_station.png',
  iconRetinaUrl: 'ukrnafta_marker_station.png',
  iconSize: new L.Point(53, 54)
})

const defaultMarker = new L.Icon({
  iconUrl: 'marker-icon.png',
  iconRetinaUrl: 'marker-icon-2x.png',    
  iconSize: new L.Point(25, 41),
  shadowUrl: 'marker-shadow.png',
  shadowAnchor: new L.Point(14, 17)
})

export const getStationMarker = (brand: string) => {
  switch(brand){
      case Brands.Okko:
        return okkoMarker
      case Brands.Wog:
        return wogMarker
      case Brands.Socar:
        return socarMarker
      case Brands.Ukrnafta:
        return ukrnaftaMarker
      default:
        return defaultMarker
  }
}

export default FuelMap
