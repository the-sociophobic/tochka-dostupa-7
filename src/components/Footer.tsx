import React from 'react'

import FormattedMessage from './FormattedMessage'
import Link from './Link'
import getSubLinks from '../utils/getSubLinks'


const links = [
  ...getSubLinks('/program'),
  {
    to: '/schedule',
    id: 'Schedule.name'
  },
  ...getSubLinks('/festival'),

  {
    to: 'https://vk.com/tochkadostupa',
    id: 'Vkontakte'
  },
  {
    to: 'https://www.facebook.com/tochkadostupa',
    id: 'Facebook'
  },
  {
    to: 'https://www.instagram.com/tochkadostupaspb/',
    id: 'Instagram'
  },
  {
    to: 'https://www.youtube.com/channel/UCcDBr-1T4dsTQO5xYmaalYg',
    id: 'Youtube'
  },

  {
    to: '/privacy',
    id: 'Privacy.name'
  },

  {
    to: '/details',
    id: 'Details.name'
  },
]
.map(link =>
  <Link
    to={link.to}
    className="Footer__link Footer__link--regular"
  >
    <FormattedMessage id={link.id} />
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