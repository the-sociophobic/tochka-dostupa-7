import React from 'react'

import _ from 'lodash'

import { Context } from '../../components/Store'
import Login from '../Login'


class Tickets extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Tickets">
        <div className="container">
          Любуемся билетами ! ! ! ! !
        </div>
      </div>
}


export default Tickets