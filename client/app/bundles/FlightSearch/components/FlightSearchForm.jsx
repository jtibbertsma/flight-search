import React from 'react'
import { reduxForm, Field } from 'redux-form'
import Select from 'react-select'
import classNames from 'classnames'
import DayPicker from 'react-day-picker'
import format from 'date-fns/format'

import Label from './Label'


const formGroupClassName = error => {
  return classNames('form-group', {
    'has-error': error
  })
}

const SelectOrigin = ({ input, meta, airports }) => {
  const onChange = item => {
    input.onChange(item && item.value)
  }
  const onBlur = () => {
    input.onBlur(input.value)
  }
  return (
    <div className={formGroupClassName(meta.touched && meta.error)}>
      <Label label="Origin" touched={meta.touched} error={meta.error} />
      <Select
        options={airports}
        instanceId="origin"
        placeholder="Select Origin..."
        {...input}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

const SelectDestinations = ({ input, meta, airports }) => {
  const onChange = array => {
    input.onChange(array.map(item => item && item.value))
  }
  const onBlur = () => {
    input.onBlur(input.value)
  }
  return (
    <div className={formGroupClassName(meta.touched && meta.error)}>
      <Label label="Possible Destinations" touched={meta.touched} error={meta.error} />
      <Select
        multi={true}
        options={airports}
        instanceId="destinations"
        placeholder="Select Destinations..."
        {...input}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

const SelectDate = ({ input, meta }) => {
  const handleDayClick = (e, day) => {
    input.onChange(day)
  }
  const onBlur = () => {
    input.onBlur(input.value)
  }
  return (
    <div className={formGroupClassName(meta.touched && meta.error)}>
      <Label label="Date" touched={meta.touched} error={meta.error} />
      <DayPicker
        {...input}
        onDayClick={handleDayClick}
        onBlur={onBlur}
      />
    </div>
  )
}

class FlightSearchForm extends React.Component {
  render() {
    const {
      submitting,
      handleSubmit,
      fetchingLocation,
      coords
    } = this.props

    const { airports } = this.context

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="origin"
          component={SelectOrigin}
          airports={airports}
          validate={value => {
            if (!value && !coords) {
              return "Unable to fetch location; you must provide an origin"
            }
          }}
        />
        <Field
          name="destinations"
          component={SelectDestinations}
          airports={airports}
          validate={(value, allValues) => {
            const origin = allValues.origin
            if (origin && value) {
              for (let i = 0; i < value.length; ++i) {
                if (origin === value[i]) {
                  return "Origin was included in destinations"
                }
              }
            }
          }}
        />
        <Field
          name="date"
          component={SelectDate}
          normalize={value => {
            return format(value, "YYYY-MM-DD")
          }}
          validate={value => {
            if (value) {
              const date = new Date(value)
              const now = new Date()

              if (date.getTime() < now.getTime()) {
                return "Must choose a date in the future"
              }
            }
          }}
        />
        <button
          type="submit"
          className="btn btn-info"
          disabled={fetchingLocation || submitting}
        >
          {submitting ? "Searching..." : "Search"}
        </button>
      </form>
    )
  }
}

FlightSearchForm.contextTypes = {
  airports: React.PropTypes.array
}

export default reduxForm({
  form: 'flightSearch'
})(FlightSearchForm)
