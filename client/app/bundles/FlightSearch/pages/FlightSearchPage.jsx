import React from 'react'

import FlightSearch from '../components/FlightSearch'
import DisplayFlights from '../components/DisplayFlights'
import Flash from '../components/Flash'


const FlightSearchPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <h1>Flight Search</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-4">
        <Flash flashKey="flightSearch" />
        <FlightSearch />
      </div>
      <div className="col-sm-8">
        <DisplayFlights />
      </div>
    </div>
  </div>
)

export default FlightSearchPage
