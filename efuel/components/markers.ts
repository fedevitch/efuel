import L from 'leaflet'
import { Brands } from '../models/fuelStation'

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

const upgMarker = new L.Icon({
  iconUrl: 'upg.svg',
  iconRetinaUrl: 'upg.svg',
  iconSize: new L.Point(45, 55),
  shadowUrl: 'marker-shadow.png',
  shadowAnchor: new L.Point(18, 22)
})

const brsmMarker = new L.Icon({
    iconUrl: 'brsm.svg',
    iconRetinaUrl: 'brsm.svg',
    iconSize: new L.Point(45, 55),
    shadowUrl: 'marker-shadow.png',
    shadowAnchor: new L.Point(18, 22)
})

const amicMarker = new L.Icon({
  iconUrl: 'amic.svg',
  iconRetinaUrl: 'amic.svg',
  iconSize: new L.Point(45, 55),
  shadowUrl: 'marker-shadow.png',
  shadowAnchor: new L.Point(18, 22)
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
      case Brands.Upg:
        return upgMarker
      case Brands.Brsm:
        return brsmMarker
      case Brands.Amic:
        return amicMarker      
      default:
        return defaultMarker
  }
}
