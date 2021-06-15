import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Helmet as ReactHelmet } from 'react-helmet'

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
    const titleText = `${getMessage(this, 'AccessPoint')} VII ${
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
    }`
    // const page = this?.context?.contentful?.[``][0]

    return (
      <ReactHelmet>
        <title>
          {titleText}
        </title>
        <meta property="og:url" content={`https://tochkadostupa.spb.ru${this.props.location.pathname}`} />
        <meta property="og:title" content={titleText} />
        {/* <meta property="og:description" content={titleText} /> */}
        <meta property="og:image" content="/og-image.jpg" />
      </ReactHelmet>
    )
  }
}


export default withRouter(Helmet)