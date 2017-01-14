import React from 'react'
import { reduxForm, Field } from 'redux-form'
import Select from 'react-select'
import classNames from 'classnames'
import DayPicker from 'react-day-picker'
import format from 'date-fns/format'

import Label from './Label'


let airportOptions = null

const formGroupClassName = error => {
  return classNames('form-group', {
    'has-error': error
  })
}

const SelectOrigin = ({ input, meta }) => {
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
        options={airportOptions}
        instanceId="origin"
        placeholder="Select Origin..."
        {...input}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

const SelectDestinations = ({ input, meta }) => {
  const onChange = array => {
    input.onChange(array.map(item => item.value))
  }
  const onBlur = () => {
    input.onBlur(input.value)
  }
  return (
    <div className={formGroupClassName(meta.touched && meta.error)}>
      <Label label="Possible Destinations" touched={meta.touched} error={meta.error} />
      <Select
        multi={true}
        options={airportOptions}
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
      {
    input.value ? (
      <p className="help-block">{`Selected ${input.value}`}</p>
    ) : ''
      }
    </div>
  )
}

class FlightSearchForm extends React.Component {
  componentWillMount() {
    if (!airportOptions) {
      const { airports } = this.context
      airportOptions = Object.keys(airports).map(key => {
        return {
          label: airports[key],
          value: key
        }
      })
      airportOptions.sort((a, b) => {
        if (a['label'] < b['label']) {
          return -1
        } else if (a['label'] === b['label']) {
          return 0
        } else {
          return 1
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.coords && nextProps.coords) {
      // HACK: revalidate when receiving coordinates
      this.originField.refs.connected.refs.wrappedInstance.handleChange(null)
    }
  }

  render() {
    const {
      submitting,
      handleSubmit,
      fetchingLocation,
      coords
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          ref={c => { this.originField = c }}
          name="origin"
          component={SelectOrigin}
          validate={value => {
            if (!value && !coords) {
              return "Unable to fetch location; you must provide an origin"
            }
          }}
        />
        <Field
          name="destinations"
          component={SelectDestinations}
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
            if (value) {
              return format(value, "YYYY-MM-DD")
            }
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
  airports: React.PropTypes.object
}

export default reduxForm({
  form: 'flightSearch'
})(FlightSearchForm)
