import React from 'react'

import _ from 'lodash'
import {
  CookiesProvider,
  withCookies,
} from 'react-cookie'

import {
  propTypes,
  StateType,
  initialState
} from './Types'
import Context from './Context'
import { getUser } from '../../utils/API'


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<{cookies: any}, StateType> {

  static propTypes = propTypes

  state = {
    ...initialState,
    setState: (obj: any) => _setState(this, obj),
  }

  componentDidMount = () =>
    this.checkUser()

  checkUser = async () => {
    const { cookies } = this.props

    console.log(cookies)
  }


  render = () =>
    <CookiesProvider>
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    </CookiesProvider>
}


export default withCookies(Provider)