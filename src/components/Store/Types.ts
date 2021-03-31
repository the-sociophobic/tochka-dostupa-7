import { instanceOf } from 'prop-types'


import plays from './hardcoded/plays'


type Maker = {
  link: string
  name: string[]
  surname: string[]
  username?: string
}

interface Play {
  link: string
  name: string[]
  shortDesc: string[]
  cover: string
  makers: Maker[]
  age: number
  online: boolean
  offline: boolean
}

type StateType = {
  locale: string
  user: object
  messages?: object
  sessionToken?: string

  plays: Play[]
}

const initialState = {
  locale: "rus",
  user: {},

  plays: plays,
}


export type {
  Play,
  StateType,
}

export {
  initialState,
}
