import React from 'react'

import _ from 'lodash'
import Cookies from 'universal-cookie'
import { deviceDetect } from 'react-device-detect'

import {
  StateType,
  initialState
} from './Types'
import Context from './Context'
import { post } from '../../utils/API'
import {
  createContentfulClient,
  getContentfulItems
} from '../../utils/contentful'


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<{}, StateType> {

  state = initialState

  cookies = new Cookies()

  contentfulClient: any

  componentDidMount = () => {
    this.checkUser()
    this.loadContentful()
  }

  checkUser = async () => {
    const res = await post('/', {
      sessionToken: this.cookies.get('sessionToken'),
      deviceInfo: JSON.stringify(deviceDetect())
    })

    if (res.newSessionToken)
      this.cookies.set('sessionToken', res.newSessionToken, { path: '/' })

    this.setState({
      sessionToken: this.cookies.get('sessionToken')
    })

    if (res.hasOwnProperty('user'))
      this.setState({ user: res.user })
  }

  logout = async () => {
    if (_.isEmpty(this.state.user))
      return
      
    const res = await post('/logout', {
      sessionToken: this.cookies.get('sessionToken'),
      deviceInfo: JSON.stringify(deviceDetect())
    })

    this.cookies.set('sessionToken', res.newSessionToken, { path: '/' })

    this.setState({
      sessionToken: this.cookies.get('sessionToken'),
      user: {}
    })
  }

  loadContentful = async () => {
    this.contentfulClient = createContentfulClient()

    this.setState({
      contentfulData: [
        await getContentfulItems(this.contentfulClient),
        await getContentfulItems(this.contentfulClient, {locale: 'en-US'})
      ]
    })

    console.log(await getContentfulItems(this.contentfulClient))
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
      }),

    openPopup: () =>
      document.body.classList.add('overflow-hidden'),
    closePopup: () =>
      document.body.classList.remove('overflow-hidden'),

    contentful: this.state.contentfulData?.[this.state.locale === "rus" ? 0 : 1],
  })

  render = () =>
    <Context.Provider value={this.stateAndSetters()}>
      {this.props.children}
    </Context.Provider>
}


export default Provider