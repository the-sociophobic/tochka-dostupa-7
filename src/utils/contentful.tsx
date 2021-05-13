import React from 'react'

import _ from 'lodash'
import { createClient } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const createContentfulClient = () =>
  createClient({
    space: 'ib2cfqvkayep',
    accessToken: 'wnUB9eqGpeeAGROQfPQpcPjEI_aUajinG38PJsQ-1II',
    host: 'cdn.contentful.com',
    // basePath: '/locales'
  })

const parseContentfulItems = async (items: any[]) => {
  let itemsByType: {[key: string]: any} = {};

  items
    .forEach((item: any) => {
      const parsedItem: any = parseItem(item)
      const type = parsedItem.type + 's'

      itemsByType.hasOwnProperty(type) ?
        itemsByType[type].push(parsedItem)
        :
        itemsByType[type] = [parsedItem]
    })

  return itemsByType
}

const parseItem = (item: any) =>
  ({
    id: item.sys.id,
    type: item?.sys?.contentType?.sys?.id,
    ..._.mapValues(
      item.fields,
      field => Array.isArray(field) ?
        field.map(entry => parseField(entry))
        :
        parseField(field)
    )
  })

const parseField = (field: any): string | any => {
  if (field?.sys?.id)
    return parseItem(field)
    
  switch(field?.nodeType || field?.sys?.type) {
    case 'document':
      return parseContentfulText(field)
    case 'Asset':
      return field?.fields?.file
    default:
      return field
  }
}

const parseContentfulText = (document: any) =>
  documentToReactComponents(document, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next) =>
        <>
          {next
            ?.toString()
            ?.split('\n')
            ?.map(paragraph => <>{paragraph}</>)
            ?.reduce((a, b) =>
              <>{a}<br />{b}</>)}
        </>
    },
  })


export {
  createContentfulClient,
  parseContentfulItems
}