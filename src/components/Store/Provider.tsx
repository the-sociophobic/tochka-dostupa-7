import React from 'react'

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
// import { getUser } from '../../utils/API'
import { messages } from './locale'


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<{cookies: any}, StateType> {

  static propTypes = propTypes

  state = initialState

  componentDidMount = () =>
    this.checkUser()

  checkUser = async () => {
    const { cookies } = this.props

    // console.log(cookies)
  }

  stateAndSetters = () => ({
    ...this.state,
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
    <CookiesProvider>
      <Context.Provider value={this.stateAndSetters()}>
        {this.props.children}
      </Context.Provider>
    </CookiesProvider>
}


export default withCookies(Provider)