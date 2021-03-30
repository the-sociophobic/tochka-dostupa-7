import React from 'react'

import _ from 'lodash'

import { post } from '../../utils/API'
import { Context } from '../../components/Store'
import Loading from './Loading'
import Login from '../Login'




class Admin extends React.Component<{}, {}> {
  
  state = {
    loading: false
  }

  static contextType = Context

  startAsync = () =>
    this.setState({ loading: true })
  endAsync = () =>
    this.setState({ loading: false })

  downloadAll = async () => {
    this.startAsync()
    
    this.endAsync()
  }
  
  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Admin">
        <div className="container">

          {/* <div className='row'>
            <div className='col-3'>
              <button
                className='button button--main'
                onClick={() => this.downloadAll()}
              >
                Выгрузить все данные
              </button>
            </div>
          </div> */}


        {this.state.loading && <Loading />}
      </div>
    </div>
}


export default Admin