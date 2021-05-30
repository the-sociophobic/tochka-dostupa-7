import React from 'react'

import { Context } from '../components/Store'
import {
  Sponsor,
  SponsorTypeLine,
} from '../components/Store/Types'
import Img from '../components/Img'


class Sponsors extends React.Component {

  static contextType = Context

  render = () => {
    const page = this?.context?.contentful?.homepages?.[0]

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
                            file={partner.logo[0]}
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
                            file={partner.logo[0]}
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

        <div className=''>
          
        </div>
      </>
  }
}


export default Sponsors