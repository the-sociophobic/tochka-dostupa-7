import React from 'react'

import FormattedMessage from '../../components/FormattedMessage'
import Dropdown from '../../components/Dropdown'
import { Context } from '../../components/Store'
import Link from '../../components/Link'
import {
  Festival,
  Spekt,
  Program,
} from '../../components/Store/Types'


class Archive extends React.Component<{}, {}> {

  static contextType = Context

  renderSpekts = (spekts: Spekt[]) =>
    spekts.map((spekt: Spekt) =>
      <div className='mb-3'>
        <p className='p p--l mb-0'>
          {spekt.name}
        </p>
        <p className='p p--xl font-spectral'>
          {spekt.eventCreators}
        </p>
      </div>
    )

  renderPrograms = (festival: Festival) =>
    this.context.contentful.programs
      .map((program: Program) => ({
        ...program,
        spekts: program?.spekts
          ?.filter((spekt: Spekt) =>
            spekt?.festival?.id === festival.id)
          || []
      }))
      .filter((program: Program) =>
        program.spekts.length > 0)
      .map((program: Program) => 
        <>
          <div className='row mb-xxs mb-md-xs'>
            <div className='col'>
              <h3 className='h3 mb-0'>
                {program.name}
              </h3>
            </div>
          </div>
          <div className='row mb-s mb-md-m'>
            <div className='col-4 col-md mr-2'>
              {this.renderSpekts(program.spekts.slice(0, Math.ceil(program.spekts.length / 2)))}
            </div>
            <div className='col-4 col-md'>
              {this.renderSpekts(program.spekts.slice(Math.ceil(program.spekts.length / 2)))}
            </div>
          </div>
        </>
      )

  render = () => {
    const festivals = this.context?.contentful?.festivals || []

    return (
      <div className="Archive">
        <div className='container'>
          <h1 className='h1'>
            <FormattedMessage id='Festival.pages.Archive.name' />
          </h1>
          {festivals
            .filter((festival: Festival) => festival.year !== 2021)
            .sort((a: Festival, b: Festival) => a.year - b.year)
            .map((festival: Festival, index: number) =>
              <Dropdown
                initialOpen={index === 0}
                title={
                  <div className='d-flex flex-column flex-md-row'>
                    <h1 className='h1 h1--xl mb-0'>
                      {festival.year}
                    </h1>
                    <div className='Archive__links'>
                      {festival.siteLink &&
                        <Link
                          to={festival.siteLink}
                          className='Archive__links__item'
                        >
                          <FormattedMessage id='Festival.pages.Archive.site' />
                        </Link>
                      }
                      {festival.bookletLink &&
                          <Link
                          to={festival.bookletLink}
                          className='Archive__links__item'
                        >
                          <FormattedMessage id='Festival.pages.Archive.booklet' />
                        </Link>
                      }
                    </div>
                  </div>
                }
              >
                <div className='row'>
                  <div className='col-4 col-sm-6 mb-s mb-md-m'>
                    {festival.mainDesc}
                  </div>
                  <div className='col-4 col-sm-6'>
                    {this.renderPrograms(festival)}
                  </div>
                </div>
                <div className='row'>
                  {festival?.facts?.map(fact =>
                    <div className='col-4 col-md-3 col-lg-4 mb-xs mb-md-0'>
                      <div className='Archive__pink-block'>
                        <div className='Archive__pink-block__number'>
                          {fact.number}
                        </div>
                        <p className='p p--L'>
                          {fact.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Dropdown>
          )}
        </div>
      </div>
    )
  }
}


export default Archive