import React from 'react'

import _ from 'lodash'

import {
  StateType,
  initialState
} from './State'
import Context from './Context'


class Provider extends React.Component<{}, StateType> {

  state = initialState

  render = () =>
    <Context.Provider value={this.state}>
      {this.props.children}
    </Context.Provider>
}


export default Provider