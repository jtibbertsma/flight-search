import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { clearFlash } from '../actions/flash'


const mapStateToProps = ({ flash }) => {
  return { flash }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ clearFlash }, dispatch)
}  

class Flash extends React.Component {
  constructor(props) {
    super(props)
    this.dismiss = this.dismiss.bind(this)

    const flashData = this.flashData()
    
    this.state = {
      hidden: !flashData,
      active: !!flashData
    }
  }

  flashData() {
    const { flash, flashKey } = this.props
    return flash[flashKey]
  }

  clear() {
    const { clearFlash, flashKey } = this.props
    clearFlash(flashKey)
  }

  dismiss(event) {
    event.preventDefault()
    event.stopPropagation()

    this.setState({ active: false })
    window.setTimeout(() => {
      this.clear()
      this.setState({ hidden: true })
    }, 200)
  }

  exclamation(type) {
    if (type === "danger") {
      return <strong>Error!</strong>
    }
  }

  componentDidUpdate() {
    const { hidden } = this.state

    if (hidden && this.flashData()) {
      this.setState({
        hidden: false,
        active: true
      })
    }
  }

  containerClassName() {
    const { active } = this.state

    return classNames('flash-leave', {
      'flash-leave-active': !active
    })
  }

  render() {
    const flashData = this.flashData()

    if (this.state.hidden || flashData === null) {
      return null
    }

    const { message } = flashData

    return (
      <div className={this.containerClassName()}>
        <button className="flash-button" onClick={this.dismiss}>&times;</button>
        <div className="alert alert-danger">
          <span>
            {`Error: ${message}`}
          </span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
