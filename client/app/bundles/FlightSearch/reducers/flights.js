import { SET_FLIGHTS } from '../constants/actions'

export default function flightsReducer(
  state = { didFirstFetch: false, flightList: []},
  action
) {
  switch(action.type) {
    case SET_FLIGHTS:
      return {
        didFirstFetch: true,
        flightList: action.flights
      }

    default:
      return state
  }
}
