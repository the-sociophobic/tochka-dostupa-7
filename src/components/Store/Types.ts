import { instanceOf } from 'prop-types'
import {
  Cookies,
} from 'react-cookie'

const propTypes = {
  cookies: instanceOf(Cookies).isRequired
}

type StateType = {
  locale: string,
  user?: string,

  setState?: Function,
}

const initialState = {
  locale: "ru",
}


export type {
  StateType,
}
export {
  propTypes,
  initialState,
}
