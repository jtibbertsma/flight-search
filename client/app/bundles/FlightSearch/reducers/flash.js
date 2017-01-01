import {
  SET_FLASH,
  CLEAR_FLASH
} from '../constants/actions'

export default function flashReducer(state = {}, action) {
  switch (action.type) {
    case SET_FLASH:
      return {
        ...state,
        [action.key]: action.data
      }

    case CLEAR_FLASH:
      return {
        ...state,
        [action.key]: null
      }

    default:
      return state
  }
}
