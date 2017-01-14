import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setUser } from '../actions/currentUser'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setUser
  }, dispatch)
}

class SignInModal extends React.Component {
  constructor(props) {
    super(props)

    this.facebookSignIn = this.facebookSignIn.bind(this)
  }

  facebookSignIn() {
    const { setUser, onCancel } = this.props

    FB.login(response => {
      if (response.authResponse) {
        setUser(response.authResponse)
      } else {
        console.log(response)
        onCancel()
      }
    })
  }

  render() {
    const {
      show,
      onCancel
    } = this.props

    return (
      <Modal
        show={show}
        onHide={onCancel}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4 className="more-margin">You must sign in to search for flights</h4>
          <div className="facebook-sign-in-button" onClick={this.facebookSignIn}>
            <svg
              className="facebook-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 216 216"
            >
              <path
                fill="white"
                d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
              />
            </svg>
            <span className="facebook-banner">Sign In With Facebook</span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-default"
            onClick={onCancel}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(null, mapDispatchToProps)(SignInModal)
