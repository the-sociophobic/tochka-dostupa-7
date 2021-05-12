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


interface FestivalWithPrograms extends Festival {
  programs: Program[]
}


class Archive extends React.Component<{}, {}> {

  static contextType = Context

  renderSpekts = (spekts: Spekt[]) =>
    spekts.map((spekt: Spekt) =>
      <div className='mb-3'>
        <p className='p p--l mb-0'>
          {spekt.name}
        </p>
        <p className='p p--xl font-spectral'>
          {spekt.persons}
        </p>
      </div>
    )

  renderPrograms = (festival: FestivalWithPrograms) =>
    festival.programs
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
    const spekts = this.context?.contentful?.spekts

    if (!spekts)
      return ''

    const festivals = this.context?.contentful?.festivals
      ?.map((festival: Festival) => ({
        ...festival,
        programs: (() => {
          let festivalPrograms: Program[] = []

          spekts
            .filter((spekt: Spekt) =>
              spekt?.festival?.id === festival.id)
            .forEach((spekt: Spekt) => {
              const programIndex = festivalPrograms
                .findIndex((program: Program) =>
                  program.id === spekt?.program?.id)

              programIndex === -1 ?
                festivalPrograms.push({
                  ...spekt.program,
                  spekts: [spekt]
                })
                :
                festivalPrograms = [
                  ...festivalPrograms.slice(0, programIndex),
                  {
                    ...spekt.program,
                    spekts: [
                      ...festivalPrograms[programIndex].spekts,
                      spekt
                    ]  
                  },
                  ...festivalPrograms.slice(programIndex + 1),
                ]
            })
          
          return festivalPrograms
        })()
      }))

    console.log(festivals)

    return (
      <div className="Archive">
        <div className='container'>
          <h1 className='h1'>
            <FormattedMessage id='Festival.pages.Archive.name' />
          </h1>
          {festivals
            .filter((festival: Festival) => festival.year !== 2021)
            .sort((a: Festival, b: Festival) => a.year - b.year)
            .map((festival: FestivalWithPrograms, index: number) =>
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
                          // onClick={(e: any) => e?.stopPropagation()}
                          to={festival.siteLink}
                          className='Archive__links__item'
                        >
                          <FormattedMessage id='Festival.pages.Archive.site' />
                        </Link>
                      }
                      {festival.bookletLink &&
                        <Link
                          // onClick={(e: any) => e?.stopPropagation()}
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
                <div className='row d-flex flex-column flex-lg-row justify-content-between'>
                  <div className='col-4 col-md-6 col-lg-5 mb-s mb-md-m p p--xxl'>
                    {festival.mainDesc}
                  </div>
                  <div className='col-4 col-md-6'>
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