import { createStore, combineReducers, applyMiddleware } from 'redux'

import geolocation from '../reducers/geolocation'
import logger from '../middleware/logger'


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

  return store
}
