import {
  CLEAR_FLASH,
  SET_FLASH
} from '../constants/actions'

export function setFlash(key, message) {
  return {
    type: SET_FLASH,
    key,
    data: {
      message
    }
  }
}

export function clearFlash(key)  {
  return {
    type: CLEAR_FLASH,
    key
  }
}
