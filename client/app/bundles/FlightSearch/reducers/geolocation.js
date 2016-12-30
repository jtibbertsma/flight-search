import {
  FETCHING_POSITION,
  SET_POSITION,
  FAILED_TO_SET_POSITION
} from '../constants/actions'


export default function geolocationReducer(
  state = { needToFetch: false, position: {} },
  action
) {
  switch(action.type) {
    case FETCHING_POSITION:
      return {
        ...state,
        fetching: true,
      }

    case SET_POSITION:
      return {
        fetching: false,
        needToFetch: false,
        position: action.position
      }

    case FAILED_TO_SET_POSITION:
      return {
        fetching: false,
        needToFetch: true,
        position: {}
      }

    default:
      return state
  }
}
