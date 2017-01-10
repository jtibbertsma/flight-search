import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FlightSearchForm from './FlightSearchForm'
import SignInModal from './SignInModal'
import { setFlights } from '../actions/flights'
import { setFlash } from '../actions/flash'
import search from '../http/search'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFlights,
    setFlash
  }, dispatch)
}

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
    const { setFlash, setFlights, coords } = this.props

    search(this.formData, coords,
      // onSuccess
      response => {
        setFlights(response.data.flights)
        this.resolvePromise()
      },

      // onError
      err => {
        if (err.response) {
          const status = err.response.status

          if (status === 403) {
            setFlash(
              'flightSearch',
              'Failed to authenticate with facebook.'
            )
          } else if (status === 400) {
            const errorMessage = err.response.data.error.errors[0].message
            setFlash(
              'flightSearch',
              `Google Flights API error with message '${errorMessage}'`
            )
          } else {
            setFlash(
              'flightSearch',
              `Unexpected server error: status code '${status}'`
            )
          }
        } else {
          setFlash('flightSearch', 'No response received. Is the internet disconnected?')
        }

        this.rejectPromise()
      }
    )
  }

  handlePromise(index, args) {
    const func = this.promise[index]

    this.formData = null
    this.promise = null

    func(...args)
  }

  resolvePromise(...args) {
    this.handlePromise(0, args)
  }

  rejectPromise(...args) {
    this.handlePromise(1, args)
  }

  cancelSignIn() {
    this.setState({showModal: false})
    this.rejectPromise()
  }

  componentWillReceiveProps(nextProps) {
    // if the modal is open when the auth request finishes,
    // close the modal and submit the form
    if (!this.props.signedIn && nextProps.signedIn && this.state.showModal) {
      this.setState({showModal: false})
      this.handleSubmitWhenSignedIn()
    }
  }

  render() {
    const { fetchingLocation, coords } = this.props
    const { showModal } = this.state

    return (
      <div>
        <SignInModal
          show={showModal}
          onCancel={this.cancelSignIn}
        />
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
