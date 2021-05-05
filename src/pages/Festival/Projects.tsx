import React from 'react'


import Link from '../../components/Link'
import { Context } from '../../components/Store'
import { Sponsor } from '../../components/Store/Types'


class Projects extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () => {
    const page = this.context?.contentful?.festivalProjectss[0]

    return !page ? '' :
      <div className="Projects">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                {page.name}
              </h1>
            </div>
          </div>

          <div className='row mb-m mb-md-l d-flex flex-column flex-lg-row justify-content-between'>
            <div className='col-4 col-md-6 col-lg-8'>
              <div className='p p--xxl'>
                {page.desc}
              </div>

              <h2 className='h2 d-none d-lg-block mt-l mb-s'>
                {page.title2}
              </h2>

              <div className='p p--l d-none d-lg-block'>
                {page.desc2}
              </div>
            </div>
            
            <div className='col-4 col-md-6 col-lg-3'>
              <div className='p p--s mb-3 mt-s mt-md-m mt-lg-0'>
                {page.partnersTitle}
              </div>
              <div className='d-none d-lg-flex flex-column flex-md-row flex-lg-column'>
                {page.sponsors.map((sponsor: Sponsor) =>
                  <img
                    src={sponsor?.logo?.[0]?.file?.url}
                    alt={sponsor?.logo?.[0]?.file?.fileName}
                    className='w-100'
                  />
                )}
              </div>
            </div>
          </div>

          <div className='row d-lg-none'>
            {page.sponsors.map((sponsor: Sponsor) =>
              <div className='col-3 col-md-2'>
                <img
                  src={sponsor?.logo?.[0]?.file?.url}
                  alt={sponsor?.logo?.[0]?.file?.fileName}
                  className='w-100'
                />
              </div>
            )}
          </div>


          <div className='row d-block d-lg-none mt-m mt-md-l'>
            <div className='col'>
              <h2 className='h2 mb-xs'>
                {page.title2}
              </h2>
              <div className='p p--l'>
                {page.desc2}
              </div>
            </div>
          </div>
        </div>
      </div>
  }
}


export default Projects