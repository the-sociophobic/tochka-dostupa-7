import React from 'react'

import defaultMessages from './defaultMessages'
import arrayToLocale from './arrayToLocale'
import flatten from '../../../utils/flatten'


const messages = arrayToLocale(flatten(defaultMessages))

type objWithContextType = {
  context: {
    messages: any,
    locale: string
  }
}

const getMessage = (
  _this: objWithContextType,
  id: string,
): string =>
    messages[_this.context.locale][id] || ""

const getMessageAllLocales = (
  _this: objWithContextType,
  id: string,
): string[] =>
    [messages["rus"][id] || "", messages["eng"][id] || ""]


export {
  messages,
  getMessage,
  getMessageAllLocales,
}