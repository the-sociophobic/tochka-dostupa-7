import React from 'react'

import Link from '../../components/Link'
import FormattedMessage from '../../components/FormattedMessage'
import HorizontalShowcase from '../../components/HorizontalShowcase'
import { Context } from '../../components/Store'
import Img from '../../components/Img'
import { Person } from '../../components/Store/Types'
import { File } from '../../components/Store/Types/contentfulTypes'


class About extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () => {

    const page = this.context?.contentful?.aboutPages[0]

    return !page ? '' :
      <div className="About">
        <div className="container">
          <div className='row mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
            <div className='col'>
              <h1 className='h1'>
                {page.name}
              </h1>
            </div>
          </div>
          <div className='row d-flex flex-column flex-lg-row justify-content-between'>
            <div className='col-4 col-md-6 col-lg-12 col-xl-8 mb-xs mb-md-s mb-xl-l'>
              <div className='p p--xxl'>
                {page.desc}            
              </div>
            </div>
            <div className='col-4 col-md-6 col-lg-12 col-xl-3'>
              <Link
                to='/festival/about/projects'
                className='p p--arrow p--arrow--right mb-xxs'
              >
                <FormattedMessage id='Festival.pages.About.pages.Projects.name' />
              </Link>
              <Link
                to='/festival/about/reviews'
                className='p p--arrow p--arrow--right mb-s mb-md-l mb-xl-0'
              >
                <FormattedMessage id='Festival.pages.About.pages.Reviews.name' />
              </Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
            </div>
          </div>
        </div>
        <HorizontalShowcase
          XL
          className='mb-m mb-md-l mb-lg-xl'
          items={page.images}
          ItemComp={(props: File & { className: string }) =>
            <Img
              file={props}
              className={`About__Img mr-4 ${props.className}`}
            />
          }
        />
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h2 className='h2 mb-xxs mb-md-s'>
                {page.teamTitle}
              </h2>
            </div>
          </div>
          <div className='row d-flex flex-row flex-wrap'>
            {page.team
              // .sort((a: Person, b: Person) => Math.random() - .5)
              .map((person: Person) =>              
                <div className='About__person'>
                  <div className='About__person__avatar'>
                    <Img file={person.avatar} />
                  </div>
                  <div className='About__person__name'>
                    {person.name} {person.surname}
                  </div>
                  <div className='About__person__title'>
                    {person.title}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  }
}


export default About