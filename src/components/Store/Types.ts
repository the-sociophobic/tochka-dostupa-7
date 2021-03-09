import { instanceOf } from 'prop-types'
import {
  Cookies,
} from 'react-cookie'

import { messages } from './locale'


const propTypes = {
  cookies: instanceOf(Cookies).isRequired
}

type StateType = {
  locale: string,
  messages?: object,
  user?: string,
}

const initialState = {
  locale: "ru",
  messages: messages["ru"],
}

export type {
  StateType,
}
export {
  propTypes,
  initialState,
}
