import React from 'react'

import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'


const links = [
  {
    to: '/program/main',
    messageId: 'Program.pages.Main.name'
  },
  {
    to: '/program/open',
    messageId: 'Program.pages.Open.name'
  },
  {
    to: '/program/educational',
    messageId: 'Program.pages.Educational.name'
  },
  {
    to: '/schedule',
    messageId: 'Schedule.name'
  },

  {
    to: '/festival/about',
    messageId: 'Festival.pages.About.name'
  },
  {
    to: '/festival/Q&A',
    messageId: 'Festival.pages.QandA.name'
  },
  {
    to: '/festival/accreditation',
    messageId: 'Festival.pages.Accreditation.name'
  },
  {
    to: '/festival/projects',
    messageId: 'Festival.pages.Projects.name'
  },
  {
    to: '/festival/archive',
    messageId: 'Festival.pages.Archive.name'
  },
  {
    to: '/festival/contacts',
    messageId: 'Festival.pages.Contacts.name'
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
    className="Footer__link Footer__link--regular"
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
          <Link to='/' className="Footer__links__home" >
            <div className="Footer__links__home__logo" />
            <FormattedMessage
              className="Footer__links__home__title"
              id='AccessPoint'
            />
          </Link>
        </div>
        <div className="Footer__links__2">
          <FormattedMessage
            id='Program.name'
            className='Footer__link Footer__link--title'
          />
          {links.slice(0, 3)}
          <div className="Footer__link Footer__link--regular" />
          {links[3]}
        </div>
        <div className="Footer__links__3">
          <FormattedMessage
            id='Festival.name'
            className='Footer__link Footer__link--title'
          />
          {links.slice(4, 10)}
        </div>
        <div className="Footer__links__divider" />
        <div className="Footer__links__4">
          <FormattedMessage
            id='Footer.media'
            className='Footer__link Footer__link--title'
          />
          {links.slice(10, 14)}
        </div>
      </div>
      <div className="Footer__contacts">
        <div className="Footer__contacts__1">
          <Link to='tel:+78126499206' className='Footer__link Footer__link--email'>
            +7 (812) 649 92 06
          </Link>
          <Link to='mailto:info@tochkadostupa.spb.ru' className='Footer__link Footer__link--email'>
            info@tochkadostupa.spb.ru
          </Link>
        </div>
        <div className="Footer__contacts__2">
          <FormattedMessage
            className="p--m"
            id="Footer.address"
          />
        </div>
        <div className="Footer__contacts__divider" />
        <div className="Footer__contacts__3">
          {links[14]}
        </div>
        <div className="Footer__contacts__divider" />
        <div className="Footer__contacts__4">
          {links[15]}
        </div>
      </div>
      <div className="Footer__disclaimer">
        <FormattedMessage
          className="p--xs col-12 pb-xs"
          id="Footer.disclaimer"
        />
      </div>
    </div>
  </footer>


export default Footer