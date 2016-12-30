import React from 'react'

import GeolocationWrapper from '../components/GeolocationWrapper'
import CheckLoginStatus from '../components/CheckLoginStatus'


const FlightSearchPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <h1>Flight Search</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <CheckLoginStatus>
          <GeolocationWrapper />
        </CheckLoginStatus>
      </div>
    </div>
  </div>
)

export default FlightSearchPage
