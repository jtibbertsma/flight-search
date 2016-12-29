import {
  SET_POSITION,
  FAILED_TO_SET_POSITION
} from '../constants/actions'


export default function geolocationReducer(
  state = { needToFetch: false, position: {} },
  action
) {
  switch(action.type) {
    case SET_POSITION:
      return {
        needToFetch: false,
        position: action.position
      }

    case FAILED_TO_SET_POSITION:
      return {
        needToFetch: true,
        position: {}
      }

    default:
      return state
  }
}
