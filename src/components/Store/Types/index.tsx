import {
  ContentfulItem,
  File,
  RichTextNode
} from './contentfulTypes'


interface Person extends ContentfulItem {
  id: string
  link: string
  name: string
  surname: string
  username?: string
  avatar?: File
  title?: string
  email?: string
  phone?: string
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
  persons: string
  personsObj?: Person[]
  age?: string | number
  online: boolean
  offline: boolean
  sponsors: Sponsor[]

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
  link: string
  datetime: string
  online?: boolean | undefined
  offline?: boolean | undefined
}

interface Program extends ContentfulItem {
  link: string
  name: string
  curators?: Person[]
  curatorTitle?: string
  mainDesc: React.ReactElement<RichTextNode>[]
  shortDesc: string
  spekts: Spekt[]
  ogdescription?: string
  ogimageVkimage?: string
}

interface Sponsor extends ContentfulItem {
  name: string
  logo: File[]
}

interface QandAsection extends ContentfulItem {
  name: string
  url: string
  items: QandAitem[]
}

interface QandAitem extends ContentfulItem {
  title: string
  text: string
}

interface Feedback extends ContentfulItem {
  author: string
  date: string
  name: string
  organization: string
  url: string
}

interface FeedbackPreview extends ContentfulItem {
  text: string
  name: string
  organization: string
  year: number
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

  // initializeCallBacks: Function[]
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

  // initializeCallBacks: []
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
  QandAsection,
  QandAitem,
  Feedback,
  FeedbackPreview,

  StateType,
}

export {
  initialState,
}
