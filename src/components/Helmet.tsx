import React from 'react'

import { Location } from '@reach/router'
import { Helmet as ReactHelmet } from 'react-helmet'

import { Context } from './Store'
import { getMessage } from './Store/locale'
import { Spekt } from './Store/Types'
import { pathToIds } from '../utils/routeUtils'


type Props = {}


class Helmet extends React.Component<Props> {

  static contextType = Context

  render = () => {

    return (
      <Location>
        {({location}) => {
          const subTitles = pathToIds(location.pathname)
            .map((section: string | undefined) =>
              ` / ${getMessage(this, section || '')}`)
              
          return (
            <ReactHelmet>
              <title>
                {getMessage(this, 'AccessPoint')} VII {
                  location.pathname.match(/\/spekt\/*/) ?
                    ' / ' + (this?.context?.contentful?.spekts
                      ?.find((spekt: Spekt) =>
                        spekt.link === location.pathname.replace('/spekt/', ''))
                      ?.name
                      || (this?.context?.contentful ? 404 : ''))
                    :
                    subTitles.length > 0 ?
                      subTitles.reduce((a, b) => a + b)
                      :
                      ''
                }
              </title>
            </ReactHelmet>
          )
        }}
      </Location>
    )
  }
}


export default Helmet