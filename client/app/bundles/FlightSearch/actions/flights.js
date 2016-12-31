import { SET_FLIGHTS } from '../constants/actions'

export function setFlights(flights) {
  return {
    type: SET_FLIGHTS,
    flights
  }
}
