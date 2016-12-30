import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FlightSearch from './FlightSearch'
import { fetchingPosition, setPosition, failedToSetPosition } from '../actions/geolocation'


const mapStateToProps = ({ geolocation, currentUser }) => {
  return {
    fetching: geolocation.fetching,
    signedIn: currentUser !== null,
    coords: geolocation.position && geolocation.position.coords
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchingPosition,
    setPosition,
    failedToSetPosition
  }, dispatch)
}

class GeolocationWrapper extends React.Component {
  componentDidMount() {
    const { fetchingPosition, setPosition, failedToSetPosition } = this.props

    // Set current position using the browser's geolocation API
    if ("geolocation" in window.navigator) {
      fetchingPosition()
      window.navigator.geolocation.getCurrentPosition(
        position => setPosition(position),
        error => failedToSetPosition()
      )
    } else {
      store.dispatch(failedToSetPosition())
    }
  }

  render() {
    const { fetching, signedIn, coords } = this.props

    return (
      <div>
        {
      fetching ? (
        <p>Fetching location...</p>
      ) : ''
        }
        <FlightSearch
          fetchingLocation={fetching}
          signedIn={signedIn}
          coords={coords}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationWrapper)
