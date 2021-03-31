import _ from 'lodash'


interface ObjectType extends Object {
  [key: string]: any
}


const filterKeys = (item: object, model: object) => 
  _.pickBy(item, (value, key) => Object.keys(model).includes(key))

const flatten = (obj: ObjectType, parentName: string = ""): ObjectType =>
  Object.keys(obj).length > 0 ?
    Object.keys(obj).map(key => {
      if (typeof obj[key] !== "object")
        return ({[parentName + key]: obj[key]})
      else
        return flatten(obj[key], parentName + key + ".")
    })
    .reduce((a, b) => ({...a, ...b}))
    :
    {}

const deflatten = (obj: ObjectType): ObjectType => {
  const firstLevelProps = _.pickBy(obj, (value, key) => !key.includes("."))
  const secondLevelProps = _.pickBy(obj, (value, key) => key.includes("."))
  let newObj = firstLevelProps

  Object.keys(secondLevelProps).forEach(key => {
    const parentName = key.split(".")[0]
    const properyName = key.slice(parentName.length + 1)

    if (typeof newObj[parentName] === "undefined")
      newObj[parentName] = {}
    
    newObj[parentName] = {
      ...newObj[parentName],
      [properyName]: obj[key],
    }
  })

  return Object.keys(newObj).length > 0 ?
    Object.keys(newObj)
      .map(key => typeof newObj[key] === "object" ?
        {[key]: deflatten(newObj[key])}
        :
        {[key]: newObj[key]}
      )
      .reduce((a, b) => ({...a, ...b}))
    :
    {}
}

const undefinedToEmptyString = (obj: ObjectType) =>
  Object.keys(obj)
    .map(key => ({[key]: typeof obj[key] === "undefined" ? "" : obj[key]}))
    .reduce((a, b) => ({...a, ...b}))

const emptyStringToUndefined = (obj: ObjectType) =>
  Object.keys(obj)
    .map(key => ({[key]: obj[key] === "" ? undefined : obj[key]}))
    .reduce((a, b) => ({...a, ...b}))
const emptyDataToUndefined = (obj: ObjectType) =>
  Object.keys(obj)
    .map(key => ({
      [key]: (Object.entries(obj).length === 0 && obj.constructor === Object) ||
             (Array.isArray(obj[key]) && obj[key].length === 0) ?
        undefined : obj[key]
    }))
    .reduce((a, b) => ({...a, ...b}))


export {
  filterKeys,
  flatten,
  deflatten,
  undefinedToEmptyString,
  emptyStringToUndefined,
  emptyDataToUndefined,
}