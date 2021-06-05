import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import HorizontalShowcase from '../components/HorizontalShowcase'
import SpektCard from '../components/Views/Cards/SpektCard'
import Link from '../components/Link'
import { Context } from '../components/Store'
import { FestivalPass } from '../components/FestivalPass'
import Subscribe from '../components/Subscribe'
import Laba from '../components/Laba'
import KeyVisual from '../components/KeyVisual'
import Sponsors from '../components/Sponsors'
import { Spekt } from '../components/Store/Types'


class Home extends React.Component<{}, {}> {

  static contextType = Context

  render = () => {
    const page = this?.context?.contentful?.homepages?.[0]

    return !page ? '' :
      <div className="Home">
        <div className="Home__cover">
          <KeyVisual imgs={page.keyvisual} />
        </div>

        <div className="container mb-s mb-md-l">        
          <div className="row mb-s">
            <div className='col-4 col-md-6 col-lg-10'>
              <div className='p p--xxl'>
                {page.shortDesc}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-md-3 col-xl-2">
              <Link
                to='/festival/about'
                className="button--secondary mb-3 mb-md-0"
              >
                <FormattedMessage id='Festival.pages.About.name'/>
              </Link>
            </div>
            <div className="col-4 col-md-3 col-xl-2">          
              <Link
                to='/festival/archive'
                className="button--secondary"
              >
                <FormattedMessage id='Festival.pages.Archive.name'/>
              </Link>
            </div>
          </div>
        </div>
        <HorizontalShowcase
          className='HorizontalShowcase--Home'
          L
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Main.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.main?.map((spekt: Spekt) => ({ ...spekt, linkDisabled: this.context.locale === 'eng'}))}
          bottomLink={{
            to: 'program/main',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        {page.showFestivalPass &&
          <FestivalPass />
        }
        <HorizontalShowcase
          className='HorizontalShowcase--Home'
          M
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Open.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.open?.map((spekt: Spekt) => ({ ...spekt, linkDisabled: this.context.locale === 'eng'}))}
          bottomLink={{
            to: 'program/open',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        <HorizontalShowcase
          className='HorizontalShowcase--Home pb-m pb-md-l pb-lg-xl'
          S
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Educational.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.educational?.map((spekt: Spekt) => ({ ...spekt, linkDisabled: this.context.locale === 'eng'}))}
          bottomLink={{
            to: 'program/educational',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        <HorizontalShowcase
          className='HorizontalShowcase--Home pb-m pb-md-l pb-lg-xl'
          S
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Friends.name`} />
            </>
          }
          ItemComp={SpektCard}
          items={page.friends?.map((spekt: Spekt) => ({ ...spekt, linkDisabled: this.context.locale === 'eng'}))}
          bottomLink={{
            to: 'program/friends',
            label: <FormattedMessage id='Program.more' />
          }}
        />

        <Laba />

        {page.showSubscribe &&
          <Subscribe />}

        <Sponsors />
        
      </div>
  }
}


export default Home