import React from 'react'
import { reduxForm } from 'redux-form'

class FlightSearchForm extends React.Component {
  render() {
    const {
      submitting,
      handleSubmit,
      fetchingLocation
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <button
          className="btn btn-info"
          disabled={fetchingLocation || submitting}
        >
          Search
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'flightSearch'
})(FlightSearchForm)
