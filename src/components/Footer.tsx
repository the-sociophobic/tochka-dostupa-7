import React from 'react'

import FormattedMessage from './FormattedMessage'
import Link from './Link'
import { getSubLinks } from '../utils/routeUtils'
import { Context } from './Store'


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
  {
    to: '/volunteers',
    id: 'Volunteers.name'
  },
]
const mappedLinks = [
  ...links.slice(0, 7),
  {
    to: '/festival/about/projects',
    id: 'Festival.pages.About.pages.Projects.name'
  },
  ...links.slice(7)
].map(link =>
  <Link
    key={link.id}
    to={link.to}
    className="Footer__link Footer__link--regular"
  >
    <FormattedMessage id={link.id} />
  </Link>)


class Footer extends React.Component {

  static contextType = Context

  render = () => {
    const footer = this?.context?.contentful?.footers?.[0]

    return (
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
              {mappedLinks.slice(0, 3)}
              {mappedLinks[4]}
              <div className="Footer__link Footer__link--regular" />
              {mappedLinks[5]}
            </div>
            <div className="Footer__links__3">
              <FormattedMessage
                id='Festival.name'
                className='Footer__link Footer__link--title'
              />
              {mappedLinks.slice(6, 12)}
              {mappedLinks[18]}
            </div>
            <div className="Footer__links__divider" />
            <div className="Footer__links__4">
              <FormattedMessage
                id='Footer.media'
                className='Footer__link Footer__link--title'
              />
              {mappedLinks.slice(12, 16)}
              {/* <div
                // className="apple-business-chat-message-container"
                // data-apple-business-id="ca0db090 8a22d77b-57a0-4f68-846e-e0b85b3655f2"
                // data-apple-icon-color="#000000"
                // data-apple-icon-background-color="#00FF19"
                // data-apple-icon-scale="1.7"
                // data-apple-icon-title="Style questions? We can help."
                className="apple-business-chat-message-container"
                data-apple-business-id="8a22d77b-57a0-4f68-846e-e0b85b3655f2"
                data-apple-icon-color="#1B3F68"
                data-apple-icon-background-color="#1B3F68"
                data-apple-icon-scale="1.7"
                data-apple-icon-title="Style questions? We can help."              />
            </div> */}
              <div
                className="apple-business-chat-message-container"
                data-apple-business-id="8a22d77b-57a0-4f68-846e-e0b85b3655f2"
                data-apple-icon-color="#000000"
                data-apple-icon-background-color="#00FF19"
                data-apple-icon-scale="1"
                data-apple-icon-title=''
              ></div>

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
              {mappedLinks[16]}
            </div>
            <div className="Footer__contacts__divider" />
            <div className="Footer__contacts__4">
              {mappedLinks[17]}
            </div>
          </div>
          <div className="Footer__disclaimer">
            <div className='p p--xs col-12 pb-xs'>
              {footer?.disclaimer}
            </div>
          </div>
        </div>
      </footer>
    )
  }
}


export default Footer