import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchingPosition, setPosition, failedToSetPosition } from '../actions/geolocation'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchingPosition,
    setPosition,
    failedToSetPosition
  }, dispatch)
}

class Geolocation extends React.Component {
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
      failedToSetPosition()
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default connect(null, mapDispatchToProps)(Geolocation)
