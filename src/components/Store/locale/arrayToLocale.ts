import _ from 'lodash'


interface messagesType {
  ru: object,
  en: object,
  [key: string]: object | undefined
}

const arrayToLocale = (obj: object): messagesType => {
  var result = {
    ru: {},
    en: {}
  }

  _.transform(obj,
    (res, value, key) => {
      res.ru[key] = value[0]
      res.en[key] = value[1]
    }, result)

  return result
}


export default arrayToLocale