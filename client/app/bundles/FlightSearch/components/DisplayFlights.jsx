import React from 'react'
import { connect } from 'react-redux'
import { Table, Column, Cell } from 'fixed-data-table-2'
import parse from 'date-fns/parse'
import format from 'date-fns/format'


const mapStateToProps = state => {
  return state.flights
}

const DisplayFlights = ({
  didFirstFetch,
  flightList
}, { airports }) => {
  if (!didFirstFetch) {
    return null
  }

  return (
    <div>
      <Table
        rowHeight={50}
        rowsCount={flightList.length}
        width={750}
        height={550}
        headerHeight={75}
      >
        <Column
          width={65}
          header={<Cell>Index</Cell>}
          cell={({rowIndex}) => (
            <Cell>
              {rowIndex}
            </Cell>
          )}
        />
        <Column
          width={100}
          header={<Cell>Price</Cell>}
          cell={({rowIndex}) => (
            <Cell>
              {flightList[rowIndex].saleTotal.replace('USD', '$')}
            </Cell>
          )}
        />
        <Column
          width={100}
          header={<Cell>Origin</Cell>}
          cell={({rowIndex}) => {
            const origin = flightList[rowIndex].slice[0].segment[0].leg[0].origin
            return (
              <Cell title={airports[origin]}>
                {origin}
              </Cell>
            )
          }}
        />
        <Column
          width={100}
          header={<Cell>Destination</Cell>}
          cell={({rowIndex}) => {
            const segment = flightList[rowIndex].slice[0].segment
            const leg = segment[segment.length-1].leg
            const destination = leg[leg.length-1].destination

            return (
              <Cell title={airports[destination]}>
                {destination}
              </Cell>
            )
          }}
        />
        <Column
          width={200}
          header={<Cell>Departure Time</Cell>}
          cell={({rowIndex}) => {
            const departureTime = parse(flightList[rowIndex].slice[0].segment[0].leg[0].departureTime)

            return (
              <Cell>
                {format(departureTime, "MMMM Do, YYYY, h:mma")}
              </Cell>
            )
          }}
        />
        <Column
          width={160}
          header={<Cell>Trip Duration</Cell>}
          cell={({rowIndex}) => {
            const duration = flightList[rowIndex].slice[0].duration

            return (
              <Cell>
                {`${Math.floor(duration / 60)} hours, ${duration % 60} minutes`}
              </Cell>
            )
          }}
        />
      </Table>
      {
    flightList.length === 0 ? (
      <p>Couldn't find any flights with the given options</p>
    ) : ''
      }
    </div>
  )
}

DisplayFlights.contextTypes = {
  airports: React.PropTypes.object
}

export default connect(mapStateToProps)(DisplayFlights)
