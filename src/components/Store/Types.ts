import { instanceOf } from 'prop-types'


type StateType = {
  locale: string,
  user: object,
  messages?: object,
  sessionToken?: string,
}

const initialState = {
  locale: "rus",
  user: {},
}

export type {
  StateType,
}
export {
  initialState,
}
