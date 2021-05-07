import React from 'react'

import axios from 'axios'
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
  parseContentfulItems,
  createContentfulClient
} from '../../utils/contentful'
import isProd from '../../utils/isProd'


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<{}, StateType> {

  state = initialState

  cookies = new Cookies()

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
    if (isProd()) {
      const contentfulData = (await axios.post('https://api.tochkadostupa.spb.ru/contentful', {})).data
  
      this.setState({
        contentfulData: [
          await parseContentfulItems(contentfulData.contentfulData[0]),
          await parseContentfulItems(contentfulData.contentfulData[1])
        ]
      })

      console.log(`contentful data last updated ${contentfulData.date}`)
    } else {
      const client = createContentfulClient()

      this.setState({
        contentfulData: [
          await parseContentfulItems((await client.getEntries({ limit: 200, })).items),
          await parseContentfulItems((await client.getEntries({ limit: 200, locale: 'en-US' })).items)
        ]
      })      
    }

    console.log(this.state.contentfulData[0])
  }

  updateContentful = async () => {
    const contentfulData = (await axios.post('https://api.tochkadostupa.spb.ru/contentful', { update: true })).data
    
    this.setState({
      contentfulData: [
        await parseContentfulItems(contentfulData.contentfulData[0]),
        await parseContentfulItems(contentfulData.contentfulData[1])
      ]
    })

    console.log(`contentful data last updated ${contentfulData.date}`)
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
    updateContentful: this.updateContentful,
  })

  render = () =>
    <Context.Provider value={this.stateAndSetters()}>
      {this.props.children}
    </Context.Provider>
}


export default Provider