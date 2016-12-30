import { SET_USER } from '../constants/actions'


export default function currentUserReducer(state = null, action) {
  switch(action.type) {
    case SET_USER:
      return action.user

    default:
      return state
  }
}
