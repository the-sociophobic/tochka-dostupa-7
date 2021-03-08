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



class Provider extends React.Component<{cookies: any}, StateType> {

  static propTypes = propTypes

  state = {
    ...initialState,
    setState: this.setState,
  }

  componentDidMount = () => {
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