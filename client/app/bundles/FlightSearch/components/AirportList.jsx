import React from 'react'

class AirportList extends React.Component {
  getChildContext() {
    return {
      airports: this.props.airports
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

AirportList.childContextTypes = {
  airports: React.PropTypes.object
}

export default AirportList
