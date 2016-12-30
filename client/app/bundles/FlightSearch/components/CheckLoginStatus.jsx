import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser } from '../actions/currentUser'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setUser
  }, dispatch)
}

class CheckLoginStatus extends React.Component {
  componentDidMount() {
    const { setUser } = this.props

    // HACK: FB won't be defined the first time this runs,
    // so check for it every 100ms
    const interval = window.setInterval(() => {
      if (typeof window.FB !== "undefined") {
        window.clearInterval(interval)

        window.FB.getLoginStatus(response => {
          if (response.status === "connected") {
            setUser(response.authResponse)
          }
        })
      }
    }, 100)
  }

  render() {
    const { children } = this.props

    return React.Children.only(children)
  }
}

export default connect(null, mapDispatchToProps)(CheckLoginStatus)
