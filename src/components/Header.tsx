import React from 'react'

import _ from 'lodash'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import LogoWithText from './LogoWithText'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'
import { ReactComponent as LocaleIcon } from '../styles/img/locale.svg'
import { ReactComponent as UserLineIcon } from '../styles/img/user-line.svg'
import HorizontalShowcase from './HorizontalShowcase'
import { getSubLinks } from '../utils/routeUtils'
import { getMessage } from './Store/locale'
import camelize from '../utils/camelize'


type PathParamsType = {
  param1: string,
}

const mobileHeaderLinks = [
    ...getSubLinks('/program'),
    {
      to: '/schedule',
      id: 'Schedule.name'
    },
    ...getSubLinks('/festival')
      .filter(link => !link.to.match(/\/festival\/projects|\/festival\/reviews/)),
    
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
  ].map(link =>
    <Link
      key={link.to}
      {...link}
    >
      <FormattedMessage id={link.id} />
    </Link>)


class Header extends React.Component<RouteComponentProps<PathParamsType>> {
  state = {
    opened: false,
    scrollingUp: false,
    secondaryLinks: [],
  }

  static contextType = Context

  secondaryRef: any = React.createRef()
  hideSecondaryLinksTimeout: any = null

  prev:any

  componentDidMount() {
    this.prev = window.scrollY
    window.addEventListener('scroll', e => this.handleScroll(e))
    this.updateSecondaryLinks()
    if (this.props.history.location.pathname.match(/\/user*/) && _.isEmpty(this.context.user))
      setTimeout(() => this.updateSecondaryLinks(), 500)
  }

  componentWillUnmount = () =>
    window.removeEventListener('scroll', e => this.handleScroll(e))

  componentDidUpdate = (prevProps: { location: Object }) => {
    if (this.props.location !== prevProps.location) {
      this.updateSecondaryLinks()
      this.setState({ opened: false })
      this.context.closePopup()
    }
  }


  updateSecondaryLinks = (pathToShow?: string) =>
    this.setState({
      secondaryLinks: (path =>
        !path.match(/\/festival*|\/program|\/user*/)
        || (path.match(/\/user*/) && _.isEmpty(this.context.user)) ?
          []
          :
          getSubLinks(path)
            .filter(link => !link.to.match(/\/festival\/projects|\/festival\/reviews/))
      )(pathToShow || this.props.history.location.pathname)
    })

  initHideSecondaryLinksTimeout = () =>
    this.hideSecondaryLinksTimeout = setTimeout(this.updateSecondaryLinks, 350)

  breakHideSecondaryLinksTimeout = () => {
    if (this.hideSecondaryLinksTimeout !== null) {
      clearTimeout(this.hideSecondaryLinksTimeout)
      this.hideSecondaryLinksTimeout = null
    }
  }

  handleScroll = (e: any) => {
    const window = e.currentTarget

    if (this.prev > window.scrollY && window.scrollY > window.innerHeight) {
      this.setState({ scrollingUp: true })
    } else if (this.prev < window.scrollY) {
      this.setState({ scrollingUp: false })
    }
    this.prev = window.scrollY
  }

  renderHeader = (className?: string, children?: JSX.Element ) =>
    <header className={`Header ${className} ${this.state.secondaryLinks.length > 0 && 'Header--secondary'}`}>
      <div className="Header__main">
        <div className="Header__container">
          
          <Link
            to="/"
            className='mr-auto'
            activeClassName="Link--active"
          >
            <LogoWithText />
          </Link>

          <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
            <div
              className={`
                Header__links__item Header__links__item--dropdown
                ${this.state.secondaryLinks.length === 3 && 'Header__links__item--hover'}
                ${this.props.location.pathname.includes('program') && 'Header__links__item--active'}
              `}
              onMouseEnter={() => {
                this.breakHideSecondaryLinksTimeout()
                this.updateSecondaryLinks('/program')
              }}
              onMouseLeave={this.initHideSecondaryLinksTimeout}
            >
              {camelize(getMessage(this, 'Program.name'))}
            </div>
            <Link
              to="/schedule"
              className="Header__links__item"
              activeClassName="Header__links__item--active"
            >
              <FormattedMessage id="Schedule.name" />
            </Link>
            <div
              className={`
                Header__links__item Header__links__item--dropdown
                ${this.state.secondaryLinks.length === 5 && 'Header__links__item--hover'}
                ${this.props.location.pathname.includes('festival') && 'Header__links__item--active'}
              `}
              onMouseEnter={() => {
                this.breakHideSecondaryLinksTimeout()
                this.updateSecondaryLinks('/festival')
              }}
              onMouseLeave={this.initHideSecondaryLinksTimeout}
            >
              <FormattedMessage id="Festival.name" />
            </div>
          </div>

          {this.renderControls()}

          <div
            className="Header__burger"
            onClick={() => {
              this.state.opened ?
                this.context.closePopup()
                :
                this.context.openPopup()
              this.setState({ opened: !this.state.opened })
            }}
          />

        </div>
      </div>

      {this.renderSecondary()}

      {children}
    </header>

  renderControls = () =>
    <div className='Header__controls'>
      <button
        className="Header__controls__item Header__controls__item--locale"
        onClick={this.context.toggleLocale}
      >
        <LocaleIcon className="Header__controls__item__icon" />
        <FormattedMessage id={this.context.locale === "rus" ? "locale.eng" : "locale.rus"} />
      </button>
      
      {!_.isEmpty(this.context.user) ?
        <>
          <div
            className={`
              d-none d-lg-block
              Header__controls__item
              Header__controls__item--user
              ${this.state.secondaryLinks.length === 4 && 'Header__controls__item--user--hover'}
              ${this.props.history.location.pathname.includes('/user/')
                && 'Header__controls__item--active'}
            `}
            onMouseEnter={() => {
              this.breakHideSecondaryLinksTimeout()
              this.updateSecondaryLinks('/user')
            }}
            onMouseLeave={this.initHideSecondaryLinksTimeout}
          >
            <UserLineIcon className="Header__controls__item__icon" />
            {this.context.user.name}
          </div>
          <Link
            to='/user/tickets'
            className={`
              d-lg-none
              Header__controls__item
              Header__controls__item--user
            `}
          >
            <UserLineIcon className="Header__controls__item__icon" />
            {this.context.user.name}
          </Link>
        </>
        :
        <Link
          to="/login"
          className='Header__controls__item'
          activeClassName='Header__controls__item--active'
        >
          <UserLineIcon className="Header__controls__item__icon" />
          <FormattedMessage id="login" />
        </Link>
      }
    </div>

  renderSecondary = () =>
    <div
      ref={this.secondaryRef}
      onMouseEnter={this.breakHideSecondaryLinksTimeout}
      onMouseLeave={this.initHideSecondaryLinksTimeout}
      className={`
        Header__secondary
        ${this.state.secondaryLinks.length > 0 && 'Header__secondary--show'}
      `}
    >
      <HorizontalShowcase
        items={this.state.secondaryLinks}
        ItemComp={props =>
          props.to === '/user/logout' ?
            <button
              className="Header__links__item Header__links__item--exit"
              onClick={() => {
                this.context.logout()
                this.props.history.push('/login')
              }}
            >
              <FormattedMessage id="User.pages.logout" />
            </button>
            :
            <Link
              to={props.to}
              exact={props.exact}
              className="Header__links__item"
              activeClassName='button--navigation--hover'
            >
              <FormattedMessage id={props.id} />
            </Link>
        }
      />
    </div>

  renderOpenedMobileHeader = () =>
    <div className={`
      Header--mobile__container
      ${this.state.opened && 'Header--mobile__container--opened'}
    `}>
      {this.renderHeader('Header--mobile',
        <div className='Header--mobile__children'>
          <div className='row d-md-none'>
            <div className='col-4 px-4'>
              {this.renderControls()}
            </div>
          </div>
          <div className='row'>
            <div className='col-4 px-4'>
              <FormattedMessage id='Program.name' />
            </div>
          </div>
          <div className='row'>
            <div className='col-4 px-4'>
              {mobileHeaderLinks.slice(0, 3)}
              <br />
              <br />
              {mobileHeaderLinks[3]}
            </div>
          </div>
          <div className='row'>
            <div className='col-4 px-4'>
              <FormattedMessage id='Festival.name' />
            </div>
          </div>
          <div className='row mb-auto'>
            <div className='col-4 col-md-6 px-4'>
              {mobileHeaderLinks.slice(4, 8)}
              <br className='d-block d-md-none' />
              {mobileHeaderLinks[8]}
            </div>
          </div>

          <div className='row'>
            <div className='col-4 col-md-6 flex-nowrap px-4'>
              {mobileHeaderLinks.slice(9, 11)}
              <br className='d-block d-md-none' />
              <br className='d-block d-md-none' />
              {mobileHeaderLinks.slice(11)}
            </div>
          </div>
        </div>
      )}
    </div>

  render = () =>
    <>
      {this.renderHeader()}
      {this.renderHeader(`Header--fixed ${(this.state.scrollingUp) && "Header--fixed--show"}`)}
      {this.renderOpenedMobileHeader()}
    </>
}


export default withRouter(Header)