import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Helmet as Helmet_ } from 'react-helmet'

import { Context } from './Store'
import { getMessage } from './Store/locale'
import { Spekt } from './Store/Types'
import { pathToIds } from '../utils/routeUtils'


type PathParamsType = {
  param1: string,
}


class Helmet extends React.Component<RouteComponentProps<PathParamsType>> {

  static contextType = Context

  render = () => {
    const subTitles = pathToIds(this.props.location.pathname)
      .map((section: string | undefined) =>
        ` / ${getMessage(this, section || '')}`)

    return (
      <Helmet_>
        <title>
          {getMessage(this, 'AccessPoint')} VII {
            this.props.location.pathname.match(/\/spekt\/*/) ?
              ' / ' + (this?.context?.contentful?.spekts
                ?.find((spekt: Spekt) =>
                  spekt.link === this.props.location.pathname.replace('/spekt/', ''))
                ?.name
                || (this?.context?.contentful ? 404 : ''))
              :
              subTitles.length > 0 ?
                subTitles.reduce((a, b) => a + b)
                :
                ''
          }
        </title>
      </Helmet_>
    )
  }
}


export default withRouter(Helmet)