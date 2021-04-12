import { instanceOf } from 'prop-types'


type Person = {
  id: string
  link: string
  name: string[]
  surname: string[]
  username?: string
}

type Festival = {
  id: string
  name: string
  year: number
  mainDesc: JSX.Element
  facts: Fact[]
  siteLink: string
  bookletLink: string
}

type Fact = {
  id: string
  number: string
  desc: JSX.Element
}

interface Spekt {
  id: string
  festival: Festival
  link: string
  name: string[]
  eventCreators: string
  shortDesc: string[]
  cover: string
  // persons: Person[]
  persons: string
  age: number
  online: boolean
  offline: boolean
}

type Program = {
  name: string
  programCurator?: Person
  nameCurator?: string
  statementShort?: JSX.Element
  statementLong?: JSX.Element
  spekts: Spekt[]
  ogdescription?: string
  ogimageVkimage?: string
}

type StateType = {
  locale: string
  user: object
  messages?: object
  sessionToken?: string

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

  contentfulData: any[]
  contentful: any
}

const initialState = {
  locale: "rus",
  user: {},

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

  contentfulData: [],
  contentful: {},
}


export type {
  Person,
  Festival,
  Spekt,
  Program,
  StateType,
}

export {
  initialState,
}
