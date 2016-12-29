import { createStore, combineReducers, applyMiddleware } from 'redux'

import geolocation from '../reducers/geolocation'
import logger from '../middleware/logger'

import { setPosition, failedToSetPosition } from '../actions/geolocation'


const reducer = combineReducers({
  geolocation
})

const enhancer = () => {
  if (process.env.NODE_ENV === 'production') {
    return undefined
  } else {
    return applyMiddleware(logger)
  }
}

export default function applicationStore(props, railsContext) {
  const store = createStore(reducer, props, enhancer())

  // Set current position using the browser's geolocation API
  // This also runs on the server
  if (typeof window !== "undefined") {
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        position => store.dispatch(setPosition(position)),
        error => store.dispatch(failedToSetPosition())
      )
    } else {
      store.dispatch(failedToSetPosition())
    }
  }

  return store
}
