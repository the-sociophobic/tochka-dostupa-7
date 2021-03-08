import React from 'react'

import {
  StateType,
  initialState
} from './Types'


const Context = React.createContext<StateType>(initialState)


export default Context