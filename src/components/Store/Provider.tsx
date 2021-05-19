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
  Days,
  Spekt,
  Place,
  Show,
  MappedShow,
} from './Types'
import Context from './Context'
import { post } from '../../utils/API'
import {
  parseContentfulItems,
  createContentfulClient
} from '../../utils/contentful'
import isProd from '../../utils/isProd'


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
    locale: this.props.location.search.includes('en') ? 'eng' : 'rus'
  }

  cookies = new Cookies()
  initializeCallBacks: Function[] = []
  mappedDays: Days[] = []

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
    if (isProd() || true) {
      await this.updateContentful(false)
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

    this.callInitializeCallbacks()
  }

  updateContentful = async (update: boolean = true) => {
    this.setState({ ready: false })

    const contentfulData = (await axios.post('https://api.tochkadostupa.spb.ru/contentful', { update: update })).data
    const parsedContentfulData = [
      await parseContentfulItems(contentfulData.contentfulData[0]),
      await parseContentfulItems(contentfulData.contentfulData[1])
    ]
    
    this.setState({
      contentfulData: parsedContentfulData
    })

    console.log(`contentful data last updated ${contentfulData.date}`)

    this.mappedDays = [
      await this.initializeMappedDays(parsedContentfulData[0].spekts),
      await this.initializeMappedDays(parsedContentfulData[1].spekts),
    ]

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

  initializeMappedDays = async (spekts: Spekt[]) =>
    new Promise<Days>((res, rej) => {
      let mappedDays: Days = {}

      spekts
        ?.map((spekt: Spekt): MappedShow[] | undefined =>
          spekt?.ticketsAndSchedule?.tickets
            .map((place: Place): MappedShow[] | undefined =>
              place?.tickets
                .map((show: Show): MappedShow => ({
                  ...show,
                  name: spekt.name,
                  persons: spekt.persons,
                  dateObj: new Date(show.datetime),
                  datetime: show.datetime,
                  program: spekt.program,
                  offline: show.offline || !show.online,
                  link: spekt.link,
                  age: spekt.age,
                })))
            .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
              [...(a || []), ...(b || [])])
        )
        ?.reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
          [...(a || []), ...(b || [])])
        ?.filter((show: MappedShow) =>
          show.datetime.length > 0)
        ?.forEach((show: MappedShow) => {
          const day = show.datetime.split('T')[0]
          
          mappedDays.hasOwnProperty(day) ?
            mappedDays[day]?.push(show)
            :
            mappedDays[day] = [show]
        })
          
      mappedDays = Object.keys(mappedDays)
        .sort()
        .map((dayKey: string): {[key: string]: MappedShow[] | undefined} => ({[dayKey]: mappedDays[dayKey]}))
        ?.reduce((a, b) => ({...a, ...b}), {})

      res(mappedDays)
      rej({})
    })

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
        this.props.history.push({
          search: this.state.locale === 'rus' ? '?en' : ''
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
  
      mappedDays: this.mappedDays?.[this.state.locale === "rus" ? 0 : 1],
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