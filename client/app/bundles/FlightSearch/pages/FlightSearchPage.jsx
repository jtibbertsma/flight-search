import React from 'react'

import GeolocationWrapper from '../components/GeolocationWrapper'


const FlightSearchPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <h1>Flight Search</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <GeolocationWrapper />
      </div>
    </div>
  </div>
)

export default FlightSearchPage
