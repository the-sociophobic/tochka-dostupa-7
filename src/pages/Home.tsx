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
              <FormattedMessage id='Festival.pages.About.name'/>
            </Link>
          </div>
          <div className="col-4 col-md-3 col-xl-2">          
            <Link
              to='/festival/archive'
              className="button--secondary mb-2"
            >
              <FormattedMessage id='Festival.pages.Archive.name'/>
            </Link>
          </div>
        </div>
      </div>
      
      <HorizontalShowcase
        L
        arrows
        title={
          <>
            <FormattedMessage id={`Program.pages.Main.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        ItemComp={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/main',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      <HorizontalShowcase
        M
        arrows
        title={
          <>
            <FormattedMessage id={`Program.pages.Open.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        ItemComp={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/open',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      <HorizontalShowcase
        S
        arrows
        title={
          <>
            <FormattedMessage id={`Program.pages.Educational.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        ItemComp={PlayCard}
        items={this.context.plays}
        bottomLink={{
          to: 'program/educational',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      
    </div>
}


export default Home