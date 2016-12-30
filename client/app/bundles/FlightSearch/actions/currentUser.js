import { SET_USER } from '../constants/actions'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
