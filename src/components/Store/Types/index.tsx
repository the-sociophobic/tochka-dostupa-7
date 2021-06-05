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
  videoCover: string
  howToOnline: JSX.Element
  howToOffline: JSX.Element
  instructions: JSX.Element
  persons: string
  personsObj?: Person[]
  length?: string
  age?: string | number
  online: boolean
  offline: boolean
  sponsors: Sponsor[]
  showDiscount?: boolean
  credits?: JSX.Element

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
  ticketsId?: string
  ticketsGroupId?: string
  url?: string
  
  online?: boolean | undefined
  offline?: boolean | undefined
  soldOut?: boolean

  datetime: string
  datetimeEnd?: string
  datetimeCust?: string
  datetimeCustEn?: string

  scheduleCust?: string
  scheduleCustEn?: string

  disclaimer?: string
  disclaimerEn?: string

  buttonNameCust?: string
  buttonNameCustEn?: string
}

interface Program extends ContentfulItem {
  link: string
  name: string

  curators?: Person[]
  curatorTitle?: string
  mainDesc: React.ReactElement<RichTextNode>[]
  shortDesc: JSX.Element
  
  curators2?: Person[]
  curatorTitle2?: string
  mainDesc2?: React.ReactElement<RichTextNode>[]
  shortDesc2?: JSX.Element

  spekts: Spekt[]
  ogdescription?: string
  ogimageVkimage?: string
}

interface Sponsor extends ContentfulItem {
  name: string
  logo: File[]
  link?: string
  title?: string
}

interface SponsorType extends ContentfulItem {
  name: string
  sponsors: Sponsor[]
}

interface SponsorTypeLine extends ContentfulItem {
  name: string
  sponsorTypes: SponsorType[]
  L: boolean
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

interface MappedShow extends Show {
  link: string
  name: string
  persons: string
  dateObj: any
  program: Program | undefined
  age?: string | number
  shortDesc?: string
  stage?: string
  stageEn?: string
  length?: string
}

type Days = {
  [key: string]: MappedShow[] | undefined
}

type LinkObj = {
  to: string
  id: string
  exact?: boolean
}




type StateType = {
  locale: string
  user: object
  ready: boolean

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
  ready: false,

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
  SponsorType,
  SponsorTypeLine,
  File,
  QandAsection,
  QandAitem,
  Feedback,
  FeedbackPreview,
  MappedShow,
  Days,
  LinkObj,

  StateType,
}

export {
  initialState,
}
