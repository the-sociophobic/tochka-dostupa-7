import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import HorizontalShowcase from '../components/HorizontalShowcase'
import SpektCard from '../components/Views/Cards/SpektCard'
import Link from '../components/Link'
import { Context } from '../components/Store'
import {
  Spekt,
  Sponsor,
  SponsorType,
} from '../components/Store/Types'
import FestivalPass from '../components/FestivalPass'
import Subscribe from '../components/Subscribe'
import Img from '../components/Img'


class Home extends React.Component<{}, {}> {

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
    const page = this?.context?.contentful?.homepages?.[0]
    const laba: Spekt = this?.context?.contentful?.spekts?.find?.((spekt: Spekt) => spekt.link === 'laboratoriagranits')

    return !page ? '' :
      <div className="Home">
        <div className="Home__cover" />

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
          items={page.main}
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
          items={page.open}
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
          items={page.educational}
          bottomLink={{
            to: 'program/educational',
            label: <FormattedMessage id='Program.full' />
          }}
        />

        
        <Link
          to={`/spekt/${laba.link}`}
          className='Home__Laba d-block d-md-none'
        >
          {this.renderLaba(laba)}
        </Link>
        <div className='Home__Laba d-none d-md-block'>
          {this.renderLaba(laba)}
        </div>

        {page.showSubscribe &&
          <Subscribe />
        }

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
          items={page.friends}
        />

        <div className='container'>
          <div className='row mb-0 mb-md-3 mb-lg-0'>
            <div className='col'>
              <h2 className='h2 h2--underline'>
                {page.partnersTitle}
              </h2>
            </div>
          </div>

          {page
            ?.sponsorsTypes?.map((sponsorType: SponsorType, index: number) =>
              <React.Fragment key={sponsorType.name}>
                <div className='row mb-xxs mb-md-s mb-lg-xs'>
                  <div className='col'>
                    <h2 className='p p--xxl'>
                      {sponsorType.name}
                    </h2>
                  </div>
                </div>
                <div className='row mb-xxs mb-md-s mb-lg-m'>
                  {sponsorType?.sponsors
                    ?.map((partner: Sponsor) =>
                      <div
                        key={partner.id}
                        className={index === 0 ? 'col-4 col-md-3' : 'col-2 col-md-2 col-lg-2'}
                      >
                        <Img
                          file={partner.logo[0]}
                          className='w-100'
                          noCrop
                        />
                      </div>
                  )}
                </div>
              </React.Fragment>
          )}

        </div>
        
      </div>
  }
}


export default Home