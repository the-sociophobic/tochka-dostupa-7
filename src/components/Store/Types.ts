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
  program: Program
  link: string
  name: string
  eventCreators: string
  shortDesc: string
  cover: File
  // persons: Person[]
  persons: string
  age?: string | number
  online: boolean
  offline: boolean
  sponsors: Sponsor

  ticketsAndSchedule: {
    tickets: Place[]
  }
}

type Place = {
  venue: string
  venueEn: string
  address: string
  addressEn: string
  online: boolean
  tickets: Show[]
}

interface Show {
  datetime: string
  online?: boolean | undefined
  offline?: boolean | undefined
}

type Program = {
  id: string
  name: string
  curators?: Person[]
  curatorTitle?: string
  mainDesc: JSX.Element
  shortDesc: string
  spekts: Spekt[]
  ogdescription?: string
  ogimageVkimage?: string
}

type Sponsor = {
  id: string
  logo: File[]
  name: string
}

type File = {
  id: string
  file: {
    contentType: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    url: string
  }
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
  Place,
  Show,
  Program,
  Sponsor,
  File,
  StateType,
}

export {
  initialState,
}
