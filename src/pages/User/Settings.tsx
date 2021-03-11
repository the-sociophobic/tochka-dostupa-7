import React from 'react'

import _ from 'lodash'

import { Context } from '../../components/Store'
import Login from '../Login'


class Settings extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Settings">
        <div className="container">
          Настраиваем ! ! ! ! !
        </div>
      </div>
}


export default Settings