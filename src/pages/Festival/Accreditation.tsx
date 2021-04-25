import React from 'react'


import Link from '../../components/Link'
import { Context } from '../../components/Store'
import { Person } from '../../components/Store/Types'
import { File } from '../../components/Store/Types/contentfulTypes'


class Accreditation extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () => {
    const page = this.context?.contentful?.accreditations[0]

    return !page ? '' :
      <div className='Accreditation'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                {page.name}
              </h1>
            </div>
          </div>
          <div className='row d-flex flex-row justify-content-between'>
            <div className='col-4'>
              <div className='p p--xl mb-s mb-md-m mb-lg-l'>
                {page.desc}
              </div>
            </div>
            <div className='col-4 col-md-5'>
              <h3 className='h3 mb-2'>
                {page.contactsTitle}
              </h3>
              {page.contacts
                .map((contact: Person) =>
                  <div className='p p--xl mb-s mb-md-m mb-lg-l'>
                    {contact.name} {contact.surname}
                    <br /><br />
                    <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
                    <br />
                    <Link to={`tel:${contact.phone}`}>{contact.phone}</Link>
                  </div>
              )}
              <h3 className='h3 mb-2'>
                {page.materialsTitle}
              </h3>
              {page.materials
                .map((material: File) =>
                  <Link
                    to={material.file.url}
                    className='p p--l p--arrow p--arrow--right mb-1 mb-md-2 mb-lg-3'
                  >
                    {material.file.fileName}
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>
  }
}


export default Accreditation