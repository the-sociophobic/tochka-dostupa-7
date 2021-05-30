import React from 'react'

import Img from '../components/Img'
import Link from '../components/Link'
import { Spekt } from '../components/Store/Types'
import FormattedMessage from '../components/FormattedMessage'
import { Context } from '../components/Store'


class Laba extends React.Component {

  static contextType = Context

  renderLaba = (laba: Spekt) =>
    <div className='container pb-m pb-md-l pb-lg-xl'>
      <div className='row'>
        <div className='col mb-xxs mb-md-xs'>
          <h2 className='h2 h2--underline mb-3 mb-md-4'>
            <FormattedMessage id='Home.Laba.name' />
          </h2>
        </div>
      </div>
      <div className='row d-flex flex-column flex-md-row align-items-stretch'>
        <div className='col-4 col-md-3 col-lg-8 order-2'>
          <Img
            className='Home__Laba__Img'
            file={laba.cover}
          />
        </div>
        <div className='col-4 col-md-3 col-lg-4 d-flex flex-column order-1 order-md-3'>
          <h3 className='h3 mb-0'>
            {laba.name}
          </h3>
          <div className='p p--m font-spectral mb-3 mb-md-4'>
            <FormattedMessage id='Home.Laba.datetime' />
          </div>
          <div className='p p--s mb-xxs mb-md-0'>
            {laba.shortDesc}
          </div>
          <Link
            to={`/spekt/${laba.link}`}
            className='button button--secondary mt-auto d-none d-md-block'
          >
            <FormattedMessage id='Spekt.FestivalPass.more' />
          </Link>
        </div>
      </div>
    </div>

  render = () => {
    const laba: Spekt = this?.context?.contentful?.spekts?.find?.((spekt: Spekt) => spekt.link === 'laboratoriagranits')

    return !laba ? '' :
      <>
        <Link
          to={`/spekt/${laba.link}`}
          className='Home__Laba d-block d-md-none'
        >
          {this.renderLaba(laba)}
        </Link>
        <div className='Home__Laba d-none d-md-block'>
          {this.renderLaba(laba)}
        </div>
      </>
  }
}


export default Laba