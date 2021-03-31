import _ from 'lodash'

import {
  deflatten,
  filterKeys,
  undefinedToEmptyString,
  emptyStringToUndefined,
  emptyDataToUndefined,
} from './objectUtils'


interface ObjectType extends Object {
  [key: string]: any
}


const flattenModel = (model: ObjectType, parentName: string = ""): ObjectType => 
  Object.keys(model).length > 0 ?
    Object.keys(model).map(key => {
      if (model[key].hasOwnProperty("type")) {
        switch (model[key].type) {
          case "object":
            return flattenModel(model[key].fields, parentName + key + ".")
          default:
            return ({[parentName + key]: model[key]})
        }          
      } else
        return flattenModel(model[key], parentName + key + ".")
    })
    .reduce((a, b) => ({...a, ...b}))
    :
    {}

const editableFields = (model: ObjectType) =>
  _.pickBy(model, (value, key) =>
    !model[key].local &&
    !model[key].type.match(/\b(id|ref|array)\b/g)
  )

const flattenEditableModel = (model: ObjectType) =>
  editableFields(flattenModel(model))

//CREATE NEW INSTANCE
const newInstance = (model: ObjectType): ObjectType =>
  Object.keys(model)
    .map(key => ({
      [key]: newInstanceType(model, key)
    }))
    .reduce((a, b) => ({...a, ...b}))

const newInstanceType = (model: ObjectType, key: string) => {
  if (model[key].default)
    return model[key].default

  switch (model[key].type) {
    case "number":
      return 0
    case "string":
      return ''
    case "boolean":
      return false
    case "object":
      if (model[key].fields)
        return newInstance(model[key].fields)
      return {}
    case "array":
      return []
    case "date":
      return 1
    case "json":
      return ({})
    case undefined:
      return []
    default:
      return []
  }
}

const flattenNewInstance = (model: ObjectType) =>
  undefinedToEmptyString(newInstance(flattenModel(model)))

const flattenEditableNewInstance = (model: ObjectType) =>
  undefinedToEmptyString(newInstance(editableFields(flattenModel(model))))

const deflattenDataByModel = (data: ObjectType, model: ObjectType) => 
  emptyDataToUndefined(
    deflatten(
      emptyStringToUndefined(
        filterKeys(data, flattenModel(model)))))

//ENCODE FOR DB
const encode = (model: ObjectType, instance: ObjectType) =>
  Object.keys(model)
    .map(key => ({
      [key]: encodeType(model, instance, key)
    }))
    // .reduce((a, b) => ({...a, ...b}))
    .reduce((a, b) => _.pickBy({...a, ...b}, _.identity))

  const encodeType = (model: ObjectType, instance: ObjectType, key: string) => {
    if (model[key].local)
      return undefined

    const value = instance[key]

    switch (model[key].type) {
      case "object":
        return value && JSON.stringify(value)
      case "array":
        return value && JSON.stringify(value)
      case "id":
        return undefined
      case "ref":
        return undefined
      case "number":
        let parsed = value

        if (typeof value === "string")
          parsed = value.includes(".") ? parseFloat(value) : parseInt(value)

        if (isNaN(parsed))
          return model[key].canBeString ? value : undefined
        return parsed
      case "select":
        if (typeof value === "undefined" && typeof model[key].default !== "undefined")
          return model[key].default
        if (model[key].options?.includes(value))
          return value
        return undefined
      default:
        return value
    }
  }
  
const encodeMany = (model: ObjectType, instances: ObjectType) =>
  encodeJSONstring(
    instances.map((instance: ObjectType) => encode(model, instance))
  )

const encodeJSONstring = (obj: ObjectType) =>
  JSON.stringify(obj)

//DECODE FROM DB
const decode = (model: ObjectType, instance: ObjectType) =>
  Object.keys(model)
    .map(key => ({
      [key]: decodeType(model, instance, key)
    }))
    // .reduce((a, b) => ({...a, ...b}))
    .reduce((a, b) =>
      _.pickBy({...a, ...b},
        (value, key) =>
          typeof value !== "undefined" && value !== null))

  const decodeType = (model: ObjectType, instance: ObjectType, key: string) => {
    const value = instance.row[0][key]

    switch (model[key].type) {
      case "point3d":
        const pos = value.coordinates
        return {
          x: pos[0],
          y: pos[1],
          z: pos[2],
        }
      case "object":
        return value && JSON.parse(value)
      case "array":
        return value && JSON.parse(value)
      case "social":
        return value && JSON.parse(value)
      default:
        return value
    }
  }

const decodeMany = (model: ObjectType, instances: ObjectType) => 
  instances?.data?.results[0]?.data.map((instance: ObjectType) => decode(model, instance))



export {
  flattenModel,
  editableFields,
  flattenEditableModel,
  newInstance,
  flattenNewInstance,
  flattenEditableNewInstance,
  deflattenDataByModel,

  encode,
  encodeMany,
  encodeJSONstring,
  decode,
  decodeMany,
}