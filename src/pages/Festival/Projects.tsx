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
        </div>
      </div>
  }
}


export default Projects