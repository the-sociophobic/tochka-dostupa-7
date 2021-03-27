import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import HorizontalShowcase from '../components/HorizontalShowcase'
import PlayCard from '../components/Views/Cards/PlayCard'
import Link from '../components/Link'
import { Context } from '../components/Store'


class Home extends React.Component<{}, {}> {

  static contextType = Context

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
      
      <HorizontalShowcase
        L
        title={
          <>
            <FormattedMessage id={`Program.Main.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        Card={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/main',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      <HorizontalShowcase
        M
        title={
          <>
            <FormattedMessage id={`Program.Open.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        Card={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/open',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      <HorizontalShowcase
        S
        title={
          <>
            <FormattedMessage id={`Program.Educational.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        Card={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/educational',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      
    </div>
}


export default Home