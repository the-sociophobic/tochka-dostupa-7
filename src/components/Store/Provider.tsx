import React from 'react'

import _ from 'lodash'

import Cookies from 'universal-cookie'

import {
  StateType,
  initialState
} from './Types'
import Context from './Context'
import { post } from '../../utils/API'


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<{}, StateType> {

  state = initialState

  cookies = new Cookies()

  componentDidMount = () =>
    this.checkUser()

  checkUser = async () => {
    const res = await post('/', { sessionToken: this.cookies.get('sessionToken') })

    console.log(res)

    if (res.newSessionToken)
      this.cookies.set('sessionToken', res.newSessionToken)

    this.setState({
      sessionToken: this.cookies.get('sessionToken')
    })

    if (res.hasOwnProperty('user'))
      this.setState({ user: res.user })
  }

  logout = async () => {
    if (_.isEmpty(this.state.user))
      return
      
    const res = await post('/logout', { sessionToken: this.cookies.get('sessionToken') })

    console.log(res)

    this.cookies.set('sessionToken', res.newSessionToken)

    this.setState({
      sessionToken: this.cookies.get('sessionToken'),
      user: {}
    })
  }

  stateAndSetters = () => ({
    ...this.state,
    cookies: this.cookies,
    checkUser: this.checkUser,
    logout: this.logout,
    setState: (obj: any) => _setState(this, obj),
    setLocale: (_locale: string) =>
      this.setState({
        locale: _locale
      }),
    toggleLocale: () =>
      this.setState({
        locale: this.state.locale === "rus" ? "eng" : "rus"
      })
  })

  render = () =>
    <Context.Provider value={this.stateAndSetters()}>
      {this.props.children}
    </Context.Provider>
}


export default Provider