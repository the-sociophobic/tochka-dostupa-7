import { instanceOf } from 'prop-types'


import plays from './hardcoded/plays'


type Person = {
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
  persons: Person[]
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
  shows: any[]
  festivals: any[]
  festivalplayrelations: any[]
  festivalplayrelationtypes: any[]
  sponsors: any[]
  sponsorplayrelations: any[]
  sponsorplayrelationtypes: any[]
  persons: any[]
  personplayrelations: any[]
  personplayrelationtypes: any[]
  users: any[]
  telegramusers: any[]
  vkusers: any[]
  instusers: any[]
}

const initialState = {
  locale: "rus",
  user: {},

  plays: plays,
  shows: [],
  festivals: [],
  festivalplayrelations: [],
  festivalplayrelationtypes: [],
  sponsors: [],
  sponsorplayrelations: [],
  sponsorplayrelationtypes: [],
  persons: [],
  personplayrelations: [],
  personplayrelationtypes: [],
  users: [],
  telegramusers: [],
  vkusers: [],
  instusers: [],
}


export type {
  Play,
  StateType,
}

export {
  initialState,
}
