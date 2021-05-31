import React from 'react'

import Link from '../../components/Link'
import { Context } from '../../components/Store'
import FormattedMessage from '../../components/FormattedMessage'


class Contacts extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () => {
    const page = this.context?.contentful?.contactss[0]

    return !page ? '' :
      <div className="Contacts">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                {page.name}
              </h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-4 col-md-6 mb-s mb-md-m mb-lg-l'>
              <h2 className='h2 mb-xs mb-md-m'>
                {page.supportTitle}
              </h2>
              <Link
                to={`tel:${page.supportPhone}`}
                className='p p--xxxl d-block'
              >
                {page.supportPhone}
              </Link>
              <Link
                to={`mailto:${page.supportEmail}`}
                className='p p--xxxl d-block'
              >
                {page.supportEmail}
              </Link>
            </div>
            <div className='col-4 mb-s mb-md-m mb-lg-l'>
              <div className='p p--l pt-2'>
                {page.desc}
              </div>
            </div>
          </div>
          <div className='delimeter mb-s mb-md-m mb-lg-l' />
          <div className='row d-flex flex-row flex-wrap'>
            {page?.emails
              .map((item: { email: string, title: string, name: string, tel: string }) =>                
                <div className='col-4 col-lg-6 mb-s mb-md-m mb-lg-l'>
                  <div className='p p--xxl font-weight-bold mb-2'>
                    {item.title}
                  </div>
                  <div className='p p--l mb-0'>
                    {item.name}
                  </div>
                  <Link
                    to={`mailto:${item.email}`}
                    className='p p--l mb-2'
                  >
                    {item.email}
                  </Link>
                  <br />
                  <Link
                    to={`tel:${item.tel}`}
                    className='p p--l mb-2'
                  >
                    {item.tel}
                  </Link>
                </div>
            )}
          </div>
          <div className='delimeter mb-s mb-md-m mb-lg-l' />
          <div className='row'>
            <div className='col-4 col-md-5 col-xl-4 mb-xxs mb-md-xs'>
              <div className='p p--xxl font-weight-bold mb-2'>
                {page.addressTitle}
              </div>
              <div className='p p--l'>
                {page.address}
              </div>
            </div>
            <div className='col-1 col-xl-2 pt-0 pt-lg-1' />
            <div className='col-4 col-lg-5 col-xl-4'>
              <h3 className='h3 mb-1 mb-md-xxs mb-lg-xs'>
                {page.organiserTitle}
              </h3>
              <div className='p p--l mb-2 mb-md-xs mb-lg-m'>
                {page.organiser}
              </div>
              <Link
                to='https://drive.google.com/file/d/1fHCRWr5t_DEUVkrQOFug3i7evZS1GV1r/view'
                className='p p--l p--arrow p--arrow--right mb-1 mb-md-2 mb-lg-3'
              >
                <FormattedMessage id='Festival.pages.Accreditation.details' />
              </Link>
            </div>
          </div>
        </div>
      </div>
  }
}


export default Contacts