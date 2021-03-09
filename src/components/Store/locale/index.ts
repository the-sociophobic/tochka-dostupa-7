import React from 'react'

import defaultMessages from './defaultMessages'
import arrayToLocale from './arrayToLocale'
import flatten from '../../../utils/flatten'


const messages = arrayToLocale(flatten(defaultMessages))

type messagesStorageType = {
  context: {
    messages: any
  }
}

const getMessage = (_this: messagesStorageType, id: string) => {
  console.log(_this.context)
  return _this.context.messages[id] || ""
}


export {
  messages,
  getMessage,
}