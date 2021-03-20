import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import ProgramPreview from '../components/ProgramPreview'
import Link from '../components/Link'


class Home extends React.Component<{}, {}> {
  render = () =>
    <div className="Home">

      <div className="Home__cover" />

      <div className="container mb-s mb-md-l">        
        <div className="row mb-s">
          <FormattedMessage
            id='Home.info'
            className='col-6 col-md-10'
          />
        </div>
        <div className="row">
          <div className="col-4 col-md-3 col-xl-2">
            <Link
              to='/festival/about'
              className="button--secondary mb-2"
            >
              <FormattedMessage id='Festival.About.name'/>
            </Link>
          </div>
          <div className="col-4 col-md-3 col-xl-2">          
            <Link
              to='/festival/archive'
              className="button--secondary mb-2"
            >
              <FormattedMessage id='Festival.Archive.name'/>
            </Link>
          </div>
        </div>
      </div>

      <ProgramPreview program='main' />
      <ProgramPreview program='open' />
      <ProgramPreview program='educational' />
      
    </div>
}


export default Home