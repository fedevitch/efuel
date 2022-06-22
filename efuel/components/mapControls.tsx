import L from 'leaflet'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { AngleLatitude, FuelTypes, Latitude } from '../models/fuelStation'
import { FuelMapProps } from './map'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css'

const MapControls = (props: FuelMapProps) => {
    const map = useMap()
  
    const osmProvider = new OpenStreetMapProvider()
  
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: osmProvider,
      marker: {
        icon: new L.Icon.Default(),
        draggable: true
      },
      keepResult: true,
      classNames: { input: styles.locationSearch },
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
          label.innerText = 'Радіус пошуку (км)'
          container.append(label)
          container.append(rangeInput)        
  
          return container
        }
      })
  
      return new RangeInput({ position: 'topleft' })
    }

    const createShowMyLocationButton = () => {
      const ShowLocation = L.Control.extend({
        onAdd: () => {
          const showLocationButton = L.DomUtil.create('button')
          showLocationButton.className = styles.locateButton
          const icon = L.DomUtil.create('img')
          icon.className = styles.locateButtonIcon
          icon.src = '/locate.png'
          showLocationButton.append(icon)
          showLocationButton.addEventListener('click', () => map.locate({ setView: true, maxZoom: 14 }))

          return showLocationButton
        }
      })

      return new ShowLocation({ position: 'bottomright' })
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
      const locationButton = createShowMyLocationButton()
      locationButton.addTo(map)    
    }, [])
  
    return null
}

export default MapControls