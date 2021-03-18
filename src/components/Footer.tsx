import React from 'react'

import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'


const links = [
  {
    to: '/program/main',
    messageId: 'Program.Main.name'
  },
  {
    to: '/program/open',
    messageId: 'Program.Open.name'
  },
  {
    to: '/program/educational',
    messageId: 'Program.Educational.name'
  },
  {
    to: '/schedule',
    messageId: 'Schedule.name'
  },

  {
    to: '/festival/about',
    messageId: 'Festival.About.name'
  },
  {
    to: '/festival/Q&A',
    messageId: 'Festival.QandA.name'
  },
  {
    to: '/festival/accreditation',
    messageId: 'Festival.Accreditation.name'
  },
  {
    to: '/festival/projects',
    messageId: 'Festival.Projects.name'
  },
  {
    to: '/festival/archive',
    messageId: 'Festival.Archive.name'
  },
  {
    to: '/festival/contacts',
    messageId: 'Festival.Contacts.name'
  },

  {
    to: 'https://vk.com/tochkadostupa',
    label: 'Vkontakte'
  },
  {
    to: 'https://www.facebook.com/tochkadostupa',
    label: 'Facebook'
  },
  {
    to: 'https://www.instagram.com/tochkadostupaspb/',
    label: 'Instagram'
  },
  {
    to: 'https://www.youtube.com/channel/UCcDBr-1T4dsTQO5xYmaalYg',
    label: 'Youtube'
  },

  {
    to: '/privacy',
    messageId: 'Privacy.name'
  },

  {
    to: '/details',
    messageId: 'Details.name'
  },
]
.map(link =>
  <Link
    to={link.to}
    className="Footer__links__item"
  >
    {link.messageId ?
      <FormattedMessage id={link.messageId} />
      :
      link.label
    }
  </Link>)


const Footer : React.FunctionComponent = ({}) =>
  <footer className="Footer">
    <div className="Footer__container">
      <div className="Footer__links">
        <div className="Footer__links__1">
          <FormattedMessage id='AccessPoint'/>
        </div>
        <div className="Footer__links__2">
          <FormattedMessage
            id='Program.name'
            className='Footer__links__title'
          />
          {links.slice(0, 3)}
          <div className="Footer__links__item" />
          {links[3]}
        </div>
        <div className="Footer__links__3">
          <FormattedMessage
            id='Festival.name'
            className='Footer__links__title'
          />
          {links.slice(4, 10)}
        </div>
        <div className="Footer__links__4">
          <FormattedMessage
            id='Footer.media'
            className='Footer__links__title'
          />
          {links.slice(10, 14)}
        </div>
      </div>
      <div className="Footer__contacts">
        <div className="Footer__contacts__1">
          <Link to='tel:+78126499206' className='p--xl'>
            +7 (812) 649 92 06
          </Link>
          <br />
          <Link to='mailto:info@tochkadostupa.spb.ru' className='p--xl'>
            info@tochkadostupa.spb.ru
          </Link>
        </div>
        <div className="Footer__contacts__2">
          <FormattedMessage
            className="p--m"
            id="Footer.address"
          />
        </div>
        <div className="Footer__contacts__3">
          {links[15]}
        </div>
        <div className="Footer__contacts__4">
          {links[16]}
        </div>
      </div>
      <div className="Footer__disclaimer px-0">
        <FormattedMessage
          className="p--xs"
          id="Footer.disclaimer"
        />
      </div>
    </div>
  </footer>


export default Footer