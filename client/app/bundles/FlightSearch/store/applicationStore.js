import { createStore, combineReducers, applyMiddleware } from 'redux'

import form from '../reducers/form'
import geolocation from '../reducers/geolocation'
import currentUser from '../reducers/currentUser'
import flights from '../reducers/flights'
import flash from '../reducers/flash'

import logger from '../middleware/logger'


const reducer = combineReducers({
  geolocation,
  currentUser,
  flights,
  flash,
  form
})

const enhancer = () => {
  if (process.env.NODE_ENV === 'production') {
    return undefined
  } else {
    return applyMiddleware(logger)
  }
}

export default function applicationStore(props, railsContext) {
  return createStore(reducer, props, enhancer())
}
