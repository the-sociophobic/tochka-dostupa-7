import React from 'react'

import _ from 'lodash'

import { Context } from '../../../components/Store'
import Login from '../../Login'


class Admin extends React.Component<{}, {}> {
  
  state = {}

  static contextType = Context

  asyncWrapper = async (fn: Function) => {
    this.setState({ loading: true })
    this.context.openPopup()
    await fn()
    this.setState({ loading: false })
    this.context.closePopup()
  }

  downloadAll = async () => {

  }
  
  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Admin">
        <div className="container">
          <div className='row'>
            <div className='col'>
              <div
                className='button button--main'
                onClick={() => this.context.updateContentful()}
              >
                Обновить данные contentful
              </div>
            </div>
          </div>
        </div>
      </div>
}


export default Admin