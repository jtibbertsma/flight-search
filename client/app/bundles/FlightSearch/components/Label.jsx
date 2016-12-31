import React from 'react'

const Label = ({
  touched,
  error,
  label
}) => (
  <label className="control-label">{`${label}${error && touched ? ': ' + error : ''}`}</label>
)

export default Label
