import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import FlightSearchForm from './FlightSearchForm'


class FlightSearch extends React.Component {
  constructor(props) {
    super(props)

    this.promise = null
    this.formData = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancelSignIn = this.cancelSignIn.bind(this)

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
          <h4>You must sign in to search for flights</h4>
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

export default FlightSearch
