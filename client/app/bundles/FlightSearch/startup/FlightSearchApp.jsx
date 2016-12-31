import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'

import FlightSearchPage from '../pages/FlightSearchPage'
import AirportList from '../components/AirportList'


function FlightSearchApp(props, railsContext) {
  const store = ReactOnRails.getStore('applicationStore')

  return (
    <AirportList airports={props.airports}>
      <Provider store={store}>
        <FlightSearchPage />
      </Provider>
    </AirportList>
  )
}

export default FlightSearchApp
