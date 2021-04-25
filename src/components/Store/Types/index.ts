import {
  ContentfulItem,
  File
} from './contentfulTypes'


interface Person extends ContentfulItem {
  id: string
  link: string
  name: string
  surname: string
  username?: string
  avatar?: File 
}

interface Festival extends ContentfulItem {
  id: string
  name: string
  year: number
  mainDesc: JSX.Element
  facts: Fact[]
  siteLink: string
  bookletLink: string
}

interface Fact extends ContentfulItem {
  number: string
  desc: JSX.Element
}

interface Spekt extends ContentfulItem {
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

interface Place extends ContentfulItem {
  venue: string
  venueEn: string
  address: string
  addressEn: string
  online: boolean
  tickets: Show[]
}

interface Show extends ContentfulItem {
  datetime: string
  online?: boolean | undefined
  offline?: boolean | undefined
}

interface Program extends ContentfulItem {
  name: string
  curators?: Person[]
  curatorTitle?: string
  mainDesc: JSX.Element
  shortDesc: string
  spekts: Spekt[]
  ogdescription?: string
  ogimageVkimage?: string
}

interface Sponsor extends ContentfulItem {
  logo: File[]
  name: string
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