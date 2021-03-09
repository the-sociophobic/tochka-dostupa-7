import _ from 'lodash'


const isJSON = (obj: object): boolean =>
  obj.constructor === ({}).constructor

const flatten = (input: object): object =>
  !isJSON(input) ?
    input
    :
    _.transform(
      input,
      (res: object, value, key) =>
        !isJSON(value) ?
          res[key] = value
          :
          _.forIn(flatten(value),
            (valueValue, valueKey) =>
              (res as any)[`${key}.${valueKey}`] = valueValue)
      , {})


export default flatten
