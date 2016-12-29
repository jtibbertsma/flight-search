import {
  SET_POSITION,
  FAILED_TO_SET_POSITION
} from '../constants/actions'


export function setPosition(position) {
  return {
    type: SET_POSITION,
    position
  }
}

export function failedToSetPosition() {
  return {
    type: FAILED_TO_SET_POSITION
  }
}
