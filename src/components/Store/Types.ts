import { instanceOf } from 'prop-types'
import {
  Cookies,
} from 'react-cookie'


const propTypes = {
  cookies: instanceOf(Cookies).isRequired
}

type StateType = {
  locale: string,
  messages?: object,
  user?: string,
  sessionToken?: string,
}

const initialState = {
  locale: "rus",
}

export type {
  StateType,
}
export {
  propTypes,
  initialState,
}
