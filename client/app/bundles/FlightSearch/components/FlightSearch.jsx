import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import FlightSearchForm from './FlightSearchForm'
import { setUser } from '../actions/currentUser'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setUser
  }, dispatch)
}

class FlightSearch extends React.Component {
  constructor(props) {
    super(props)

    this.promise = null
    this.formData = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancelSignIn = this.cancelSignIn.bind(this)
    this.facebookSignIn = this.facebookSignIn.bind(this)

    this.state = {
      showModal: false
    }
  }

  handleSubmit(data) {
    const { signedIn } = this.props

    return new Promise((resolve, reject) => {
      this.formData = data
      this.promise = [resolve, reject]

      if (signedIn) {
        this.handleSubmitWhenSignedIn()
      } else {
        this.setState({showModal: true})
      }
    })
  }

  handleSubmitWhenSignedIn() {
    console.log("Submitted form")
    this.resolvePromise()
  }

  handlePromise(index) {
    const func = this.promise[index]

    this.formData = null
    this.promise = null

    func()
  }

  resolvePromise() {
    this.handlePromise(0)
  }

  rejectPromise() {
    this.handlePromise(1)
  }

  cancelSignIn() {
    this.setState({showModal: false})
    this.rejectPromise()
  }

  facebookSignIn() {
    const { setUser } = this.props

    FB.login(response => {
      if (response.authResponse) {
        setUser(response.authResponse)
        this.setState({showModal: false})
        this.handleSubmitWhenSignedIn()
      } else {
        this.cancelSignIn()
      }
    })
  }

  modal() {
    const { showModal } = this.state

    return (
      <Modal
        show={showModal}
        onHide={this.cancelSignIn}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4 className="more-margin">You must sign in to search for flights</h4>
          <div className="facebook-sign-in-button" onClick={this.facebookSignIn}>
            <svg className="facebook-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216"><path fill="white" d="
              M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
              11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
              11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
              15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
              11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
            <span className="facebook-banner">Sign In With Facebook</span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-default"
            onClick={this.cancelSignIn}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    const { signedIn, fetchingLocation, coords } = this.props

    return (
      <div>
        {this.modal()}
        <FlightSearchForm
          onSubmit={this.handleSubmit}
          fetchingLocation={fetchingLocation}
          coords={coords}
        />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(FlightSearch)
