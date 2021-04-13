import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import HorizontalShowcase from '../components/HorizontalShowcase'
import SpektCard from '../components/Views/Cards/SpektCard'
import Link from '../components/Link'
import { Context } from '../components/Store'
import { Spekt } from '../components/Store/Types'


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
      {(() => console.log(this.context?.contentful?.spekts))()}
      <HorizontalShowcase
        L
        arrows
        title={
          <>
            <FormattedMessage id={`Program.pages.Main.name`} /> <FormattedMessage id='Program.name' />
          </>
        }
        ItemComp={SpektCard}
        items={this.context?.contentful?.spekts
          ?.filter((spekt: Spekt) =>
            spekt?.festival?.id === '1eHNqsKS7e2QSVlvmtGEc1' && spekt?.program?.id === '7fOwCkT7nOXh3C81toLoSs')}
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
        ItemComp={SpektCard}
        items={this.context?.contentful?.spekts
          ?.filter((spekt: Spekt) =>
            spekt?.festival?.id === '1eHNqsKS7e2QSVlvmtGEc1' && spekt?.program?.id === '4qgsLo90by1TfShZwdyNhw')}
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
        ItemComp={SpektCard}
        items={this.context?.contentful?.spekts
          ?.filter((spekt: Spekt) =>
            spekt?.festival?.id === '1eHNqsKS7e2QSVlvmtGEc1' && spekt?.program?.id === '6OfzgvjCzzT1xhlwDH2AfQ')}
        bottomLink={{
          to: 'program/educational',
          label: <FormattedMessage id='Program.full' />
        }}
      />
      
    </div>
}


export default Home