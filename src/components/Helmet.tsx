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
    const defaultDesc = 'Международный Летний фестиваль искусств «Точка доступа» — крупнейший форум сайт-специфического и иммерсивного искусства в России, он проводится в Петербурге с 2015 года. «Точка доступа» всегда исследует новые территории театра и предлагает зрителю новый опыт восприятия и коммуникации с пространством. Резиденты и гости «Точки доступа» — российские и зарубежные режиссеры — осваивают локации, обычно ничего общего с театром не имеющие, и одновременно знакомят зрителей с прогрессивным, смелым и актуальным искусством.'
    const defaultImg = '/og-image.jpg'
    // const page = this?.context?.contentful?.[``][0]

    return (
      <ReactHelmet>
        <title>
          {titleText}
        </title>
        <meta property="og:url" content={`https://tochkadostupa.spb.ru${this.props.location.pathname}`} />
        <meta property="og:title" content={titleText} />
        <meta property="og:description" content={defaultDesc} />
        <meta property="og:image" content={defaultImg} />
      </ReactHelmet>
    )
  }
}


export default withRouter(Helmet)