import React from 'react'

import { Context } from '../components/Store'
import {
  Sponsor,
  SponsorType,
  SponsorTypeLine,
} from '../components/Store/Types'
import Img from '../components/Img'


class Sponsors extends React.Component {

  static contextType = Context

  renderImg = (sponsor: Sponsor, className?: string) =>
    sponsor &&
      <Img
        file={sponsor.logo[0]}
        className={`w-100 ${className}`}
        noCrop
      />

  render6 = (sponsorType?: SponsorType, withTitles?: boolean, className?: string) =>
    sponsorType &&
      <div className={`container ${className}`}>
        <div className='row d-flex flex-row flex-wrap'>
          {sponsorType?.sponsors?.map((sponsor: Sponsor) =>
            <div className='col-2 col-md-2 col-lg-2 d-flex flex-column align-self-stretch justify-content-between'>
              {withTitles &&
                <div className='p p--m mb-4 mb-md-xs'>
                  {sponsor.title}
                </div>
              }
              {this.renderImg(sponsor, withTitles ? '' : 'mb-4 mb-lg-xs')}
            </div>
          )}
        </div>
      </div>

  render = () => {
    const page: any & {
      sponsorsTypesLines: (SponsorTypeLine | SponsorTypeLine)[]
    } = this?.context?.contentful?.homepages?.[0]

    return !page ? '' :
      <>
        <div className='container'>
          <div className='row mb-0 mb-md-3 mb-lg-0'>
            <div className='col'>
              <h2 className='h2 h2--underline'>
                {page.partnersTitle}
              </h2>
            </div>
          </div>
        </div>

        <div className='container mb-s mb-md-m'>
          <div className='row d-flex flex-row flex-wrap'>
            {page.sponsorsTypesLines?.[0]?.sponsors?.map((sponsor: Sponsor) =>
              <div className='col-2 col-md-3 col-lg-4'>
                {this.renderImg(sponsor)}
              </div>
            )}
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-4 col-md-5 col-lg-8'>
              <div className='p p--xl'>
                {page.sponsorsTypesLines?.[1]?.name}
              </div>
            </div>
          </div>
        </div>
        <div className='container mb-s mb-md-m'>
          <div className='row d-flex flex-row flex-wrap'>
            <div className='col-2 col-md-3 col-lg-4'>
              {this.renderImg(page.sponsorsTypesLines?.[1]?.sponsors?.[0])}
            </div>
          </div>
        </div>

        <div className='container mb-4 mb-md-s'>
          <div className='row'>
            <div className='col-4 col-md-5 col-lg-8'>
              <div className='p p--xl'>
                {page.sponsorsTypesLines?.[2]?.name}
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row d-flex flex-row flex-wrap'>
            <div className='col-2 col-md-3 col-lg-4'>
              {this.renderImg(page.sponsorsTypesLines?.[2]?.sponsors?.[0])}
            </div>
          </div>
        </div>
        <div className='container mb-s mb-md-m'>
          <div className='row'>
            <div className='col'>
              <div className='delimeter' />
            </div>
          </div>
        </div>

        {this.render6(page.sponsorsTypesLines?.[3], true, 'mb-s mb-md-m')}
        {this.render6(page.sponsorsTypesLines?.[4], true, 'mb-s mb-md-m')}
        <div className='container mb-s mb-md-m'>
          <div className='row'>
            <div className='col'>
              <div className='delimeter' />
            </div>
          </div>
        </div>

        <div className='container mb-4 mb-md-s'>
          <div className='row'>
            <div className='col-4 col-md-5 col-lg-8'>
              <div className='p p--xl'>
                {page.sponsorsTypesLines?.[5]?.name}
              </div>
            </div>
          </div>
        </div>
        {this.render6(page.sponsorsTypesLines?.[5], false, 'mb-s mb-md-m')}
        <div className='container mb-s mb-md-m'>
          <div className='row'>
            <div className='col'>
              <div className='delimeter' />
            </div>
          </div>
        </div>

        <div className='container mb-s mb-md-m'>
          <div className='row'>
            {page.sponsorsTypesLines?.[6]?.sponsorTypes?.map((sponsorType: SponsorType) =>
              <div className='col-2 col-md-3 col-lg-6'>
                <div className='row mb-4 mb-lg-xs'>
                  <div className='col'>
                    <div className='p p--xl'>
                      {sponsorType.name}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-4 col-md-6 col-lg-6'>
                    {this.renderImg(sponsorType.sponsors[0])}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='container mb-4 mb-lg-xs'>
          <div className='row'>
            <div className='col'>
              <div className='p p--xl'>
                {page.sponsorsTypesLines?.[7]?.name}
              </div>
            </div>
          </div>
        </div>
        {this.render6(page.sponsorsTypesLines?.[7], false, '')}

      </>
  }
}


export default Sponsors