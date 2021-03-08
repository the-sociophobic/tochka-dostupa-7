import React from 'react'

import {
  StateType,
  initialState
} from './State'


const Context = React.createContext<StateType>(initialState)


export default Context