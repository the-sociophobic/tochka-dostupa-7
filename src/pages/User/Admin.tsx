import React from 'react'

import _ from 'lodash'

import { Context } from '../../components/Store'
import Login from '../Login'


class Admin extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Admin">
        <div className="container">
          Админим ! ! ! ! !
        </div>
      </div>
}


export default Admin