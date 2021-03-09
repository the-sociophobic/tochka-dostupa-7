import _ from 'lodash'


interface messagesType {
  [key: string]: {
    [key: string]: string | undefined
  }
}

const arrayToLocale = (obj: object): messagesType => {
  var result = {
    rus: {},
    eng: {}
  }

  _.transform(obj,
    (res, value, key) => {
      res.rus[key] = value[0]
      res.eng[key] = value[1]
    }, result)

  return result
}


export default arrayToLocale