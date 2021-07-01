import React from 'react'

import { Context } from '../../components/Store'
import {
  Person,
  Program,
  Spekt,
} from '../../components/Store/Types'
import TextDropdown from '../../components/TextDropdown'
import CuratorsAvatars from '../../components/CuratorsAvatars'
import SpektCard from '../../components/Views/Cards/SpektCard'
import Img from '../../components/Img'


type Props = {
  programId: string
  text?: boolean
  text2?: boolean
}


class Template extends React.Component<Props, {}> {
  
  static contextType = Context

  renderText = (program: Program, opened: boolean, opened2: boolean) =>
    <>
      {!opened2 &&
        <TextDropdown
          initialOpen={opened}
          link={program.link === 'friends' ?
            undefined
            :
            opened ? `/program/${program.link}` : `/program/${program.link}/text`}
          className={program.shortDesc2 ? '' : 'mb-s mb-md-l mb-lg-xl'}
          shortDesc={program.shortDesc}
          additionalContent={
            <div className='d-flex flex-column flex-md-row flex-lg-column flex-xl-row mb-s mb-lg-0'>
              <CuratorsAvatars
                S
                curators={program?.curators}
                className='mr-2 mb-2'
              />
              <div className='d-flex flex-column'>
                <h3 className='h3'>
                  {program?.curators
                    ?.map((curator: Person) =>
                      <>
                        {curator.name}&nbsp;{curator.surname}
                      </>)
                    ?.reduce((a: JSX.Element, b: JSX.Element, index: Number) =>
                      <>
                        {a}{index === (program?.curators?.length || 0) - 1 ? ' и ' : ', '}{b}
                      </>)}
                </h3>
                <div className='p p--xl font-spectral'>
                  {program?.curatorTitle}
                </div>
              </div>
            </div>
          }
        >
          {program?.mainDesc}
        </TextDropdown>
      }

      {(program.shortDesc2 && !opened) &&
        <TextDropdown
          initialOpen={opened2}
          link={opened2 ? `/program/${program.link}` : `/program/${program.link}/text2`}
          className='mb-s mb-md-l mb-lg-xl'
          shortDesc={program.shortDesc2}
          additionalContent={
            <div className='d-flex flex-column flex-md-row flex-lg-column flex-xl-row mb-s mb-lg-0'>
              <CuratorsAvatars
                S
                curators={program?.curators2}
                className='mr-2 mb-2'
              />
              <div className='d-flex flex-column'>
                <h3 className='h3'>
                  {program?.curators2
                    ?.map((curator: Person) =>
                      <>
                        {curator.name}&nbsp;{curator.surname}
                      </>)
                    ?.reduce((a: JSX.Element, b: JSX.Element, index: Number) =>
                      <>
                        {a}{index === (program?.curators?.length || 0) - 1 ? ' и ' : ', '}{b}
                      </>)}
                </h3>
                <div className='p p--xl font-spectral'>
                  {program?.curatorTitle2}
                </div>
              </div>
            </div>
          }
        >
          {program?.mainDesc2}
        </TextDropdown>
      }
    </>

  render = () => {
    const program: Program = this.context?.contentful?.programs
      ?.find((program: Program) => program.id === this.props.programId)
    const homepage = this?.context?.contentful?.homepages?.[0]

    return (!program || !homepage) ? '' :
      this.props.text ?
        <div className="Program">
          <div className='container'>
            <div className='row'>
              <div className='col'>
                {this.renderText(program, true, false)}
              </div>
            </div>
          </div>
        </div>
        :
        this.props.text2 ?
          <div className="Program">
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  {this.renderText(program, false, true)}
                </div>
              </div>
            </div>
          </div>
          :
          <div className="Program">
            <div className='container'>
              <div className='row'>
                <div className='col-4 col-md-6 col-lg-12'>
                  <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                    {program?.name}
                  </h1>
                </div>
              </div>

              {this.renderText(program, false, false)}

              {this.props.programId === '7fOwCkT7nOXh3C81toLoSs' &&
                <>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-4 col-md-5 col-lg-8'>
                        <div className='p p--xl'>
                          {homepage.sponsorsTypesLines?.[1]?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='container mb-s mb-md-m'>
                    <div className='row d-flex flex-row flex-wrap'>
                      <div className='col-2 col-md-3 col-lg-4'>
                        {homepage.sponsorsTypesLines?.[1]?.sponsors?.[0] &&
                          <Img
                            file={homepage.sponsorsTypesLines?.[1]?.sponsors?.[0].logo[0]}
                            className='w-100'
                            noCrop
                          />
                        }
                      </div>
                    </div>
                  </div>
                </>
              }

              <div className='row d-flex flex-row flex-wrap'>
                {homepage[program.link]
                  ?.map((spekt: Spekt) =>
                    <div className='Program__SpektCard-delimeter'>
                      <SpektCard
                        {...spekt}
                        avatarsL={this.props.programId === '6OfzgvjCzzT1xhlwDH2AfQ'}
                        className='SpektCard--Program'
                      />
                    </div>
                )}
              </div>
            </div>
          </div>
  }
}


export default Template