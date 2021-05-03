import React from 'react'


import Link from '../../components/Link'
import { Context } from '../../components/Store'


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
            <div className='col-4 col-md-6 col-lg-8 p p--l'>
              {page.desc}
            </div>
            <div className='col-4 col-md-6 col-lg-3'>
              <div className='p p--s'>
                {page.partnersTitle}
              </div>
            </div>
          </div>
        </div>
      </div>
  }
}


export default Projects