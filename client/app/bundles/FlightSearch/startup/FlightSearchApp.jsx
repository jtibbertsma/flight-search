import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'

import FlightSearchPage from '../pages/FlightSearchPage'


function FlightSearchApp(props, railsContext) {
  const store = ReactOnRails.getStore('applicationStore')

  return (
    <Provider store={store}>
      <FlightSearchPage />
    </Provider>
  )
}

export default FlightSearchApp
