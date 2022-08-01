import { Coordinates, FuelTypes } from "../models/fuelStation";

const defaultParams = {
    RANGE_R: 0.088888888,
    RANGE_KM: 10,
    LOCATION: { lat: 49.840762, lon: 24.0291513 } as Coordinates,
    FUEL_TYPE: FuelTypes.A95
}

export default defaultParams