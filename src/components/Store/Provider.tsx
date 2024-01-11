import React from 'react'

import axios from 'axios'
import _ from 'lodash'
import Cookies from 'universal-cookie'
import { deviceDetect } from 'react-device-detect'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import {
  StateType,
  initialState,
} from './Types'
import Context from './Context'
import { post } from '../../utils/API'
import {
  parseContentfulItems,
  createContentfulClient
} from '../../utils/contentful'
import isProd from '../../utils/isProd'
import parseData from './parseData'
import contentfulDataJSON from './contentfulData.json'


type Props = RouteComponentProps<{
  param1: string,
}>


const _setState = (_this: any, obj: any) => {
  _this.setState(obj)
  //TODO send async post
}


class Provider extends React.Component<Props, StateType> {

  state = {
    ...initialState,
    locale: (new URLSearchParams(this.props.location.search)).get('en') === '' ? 'eng' : 'rus'
  }

  cookies = new Cookies()
  initializeCallBacks: Function[] = []

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

  loadContentfulJSON = async () => {
    this.setState({ ready: false })

    this.setState({
      contentfulData: contentfulDataJSON
    })
 
    this.setState({ ready: true })

    this.callInitializeCallbacks()
  }

  loadContentful = async () => {
    // if (isProd() || true) {
    //   await this.updateContentful(false)
    // } else {
    this.setState({ ready: false })

    const client = createContentfulClient()

    this.setState({
      contentfulData: [
        await parseContentfulItems((await client.getEntries({ limit: 200, })).items),
        await parseContentfulItems((await client.getEntries({ limit: 200, locale: 'en-US' })).items)
      ]
    })
    // }

    this.setState({ ready: true })

    this.callInitializeCallbacks()
  }

  updateContentful = async (update: boolean = true) => {
    this.setState({ ready: false })

    const contentfulData = (await axios.post('https://api.tochkadostupa.spb.ru/contentful', { update: update })).data
    const parsedContentfulData = [
      await parseData(await parseContentfulItems(contentfulData.contentfulData[0])),
      await parseData(await parseContentfulItems(contentfulData.contentfulData[1])),
    ]

    this.setState({
      contentfulData: parsedContentfulData
    })

    console.log(`contentful data last updated ${contentfulData.date}`)

    this.setState({ ready: true })

    update &&
      this.callInitializeCallbacks()
  }

  registerInitializeCallback = (fn: Function) => {
    this.initializeCallBacks.push(fn)
    this.state.contentfulData.length > 0 && fn()
  }

  callInitializeCallbacks = () =>
    setTimeout(() =>
      this.initializeCallBacks
        .forEach((callback: Function) =>
          callback())
      , 100
    )

  stateAndSetters = () => {
    const nonState = {
      cookies: this.cookies,
      checkUser: this.checkUser,
      logout: this.logout,
      setState: (obj: any) => _setState(this, obj),
      setLocale: (_locale: string) =>
        this.setState({
          locale: _locale
        }),
      toggleLocale: () => {
        const params = new URLSearchParams(this.props.location.search)

        if (this.state.locale === 'rus')
          params.append('en', '')
        else
          params.delete('en')

        const paramsString = params.toString()

        this.props.history.push({
          search: paramsString.length === 0 ? '' : `?${paramsString}`
        })
        this.setState({
          locale: this.state.locale === "rus" ? "eng" : "rus"
        })
      },

      openPopup: () =>
        document.body.classList.add('overflow-hidden'),
      closePopup: () =>
        document.body.classList.remove('overflow-hidden'),

      contentful: this.state.contentfulData?.[this.state.locale === "rus" ? 0 : 1],
      updateContentful: this.updateContentful,

      registerInitializeCallback: this.registerInitializeCallback,
    }

    return ({
      ...(this.state.ready ? this.state : initialState),
      ...nonState
    })
  }

  render = () =>
    <Context.Provider value={this.stateAndSetters()}>
      {this.props.children}
    </Context.Provider>
}


export default withRouter(Provider)