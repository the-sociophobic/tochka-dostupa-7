import { instanceOf } from 'prop-types'


type StateType = {
  locale: string,
  messages?: object,
  user?: object,
  sessionToken?: string,
}

const initialState = {
  locale: "rus",
}

export type {
  StateType,
}
export {
  initialState,
}
