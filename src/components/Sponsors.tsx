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
            <div className='col-2 col-md-2 col-lg-2 d-flex flex-column'>
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

    console.log(page)

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

        {/* {page
          ?.sponsorsTypesLines?.map((sponsorTypeLine: SponsorTypeLine, index: number) =>
            <div
              key={index}
              className='container'
            >
              <div className='row mb-xxs mb-md-s mb-lg-xs'>
                <div className='col-4 col-md-6 col-lg-6 d-flex flex-column'>
                  <p className='p p--xxl mb-xxs'>
                    {sponsorTypeLine.sponsorTypes[0].name}
                  </p>
                  <div className='row d-flex flex-column flex-md-row mb-xxs mb-md-s mb-lg-m'>
                    {sponsorTypeLine.sponsorTypes[0].sponsors
                      ?.map((partner: Sponsor) =>
                        <div
                          key={partner.id}
                          className={sponsorTypeLine.L ? 'col-4 col-md-3 col-lg-6' : 'col-2 col-md-2 col-lg-4'}
                        >
                          <Img
                            file={partner.logo}
                            className='w-100'
                            noCrop
                          />
                        </div>
                    )}
                  </div>
                </div>
                <div className='col-4 col-md-6 col-lg-6 d-flex flex-column'>
                  <p className='p p--xxl mb-xxs'>
                    {sponsorTypeLine.sponsorTypes[1].name}
                  </p>
                  <div className='row d-flex flex-column flex-md-row mb-xxs mb-md-s mb-lg-m'>
                    {sponsorTypeLine.sponsorTypes[1].sponsors
                      ?.map((partner: Sponsor) =>
                        <div
                          key={partner.id}
                          className={sponsorTypeLine.L ? 'col-4 col-md-3 col-lg-6' : 'col-2 col-md-2 col-lg-4'}
                        >
                          <Img
                            file={partner.logo}
                            className='w-100'
                            noCrop
                          />
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

        )} */}

        <div className='container mb-s mb-md-m'>
          <div className='row d-flex flex-row flex-wrap'>
            {page.sponsorsTypesLines?.[0]?.sponsors?.map((sponsor: Sponsor) =>
              <div className='col-2 col-md-3 col-lg-4'>
                {this.renderImg(sponsor)}
              </div>
            )}
          </div>
        </div>

        <div className='container mb-4 mb-md-s'>
          <div className='row'>
            <div className='col-4 col-md-5 col-lg-8'>
              <div className='p p--xl'>
                {page.sponsorsTypesLines?.[1]?.name}
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row d-flex flex-row flex-wrap'>
            <div className='col-2 col-md-3 col-lg-4'>
              {this.renderImg(page.sponsorsTypesLines?.[1]?.sponsors?.[0])}
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

        {this.render6(page.sponsorsTypesLines?.[2], true, 'mb-s mb-md-m')}
        {this.render6(page.sponsorsTypesLines?.[3], true, 'mb-s mb-md-m')}
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
                {page.sponsorsTypesLines?.[4]?.name}
              </div>
            </div>
          </div>
        </div>
        {this.render6(page.sponsorsTypesLines?.[4], false, 'mb-s mb-md-m')}
        <div className='container mb-s mb-md-m'>
          <div className='row'>
            <div className='col'>
              <div className='delimeter' />
            </div>
          </div>
        </div>

        <div className='container mb-s mb-md-m'>
          <div className='row'>
            {page.sponsorsTypesLines?.[5]?.sponsorTypes?.map((sponsorType: SponsorType) =>
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
                {page.sponsorsTypesLines?.[6]?.name}
              </div>
            </div>
          </div>
        </div>
        {this.render6(page.sponsorsTypesLines?.[6], false, '')}

      </>
  }
}


export default Sponsors