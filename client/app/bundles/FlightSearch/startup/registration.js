import ReactOnRails from 'react-on-rails'

import FlightSearchApp from './FlightSearchApp'
import applicationStore from '../store/applicationStore'

ReactOnRails.registerStore({applicationStore})
ReactOnRails.register({FlightSearchApp})
