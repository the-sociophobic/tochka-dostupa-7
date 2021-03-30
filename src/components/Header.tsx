import React from 'react'

import _ from 'lodash'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'
import { ReactComponent as LocaleIcon } from '../styles/img/locale.svg'
import { ReactComponent as UserLineIcon } from '../styles/img/user-line.svg'
import HorizontalShowcase from './HorizontalShowcase'
import defaultMessages from './Store/locale/defaultMessages'
import camelize from '../utils/camelize'


type PathParamsType = {
  param1: string,
}


class Header extends React.Component<RouteComponentProps<PathParamsType>> {
  state = {
    opened: false,
    scrollingUp: false,
    secondaryLinks: [],
  }

  static contextType = Context

  secondaryRef: any = React.createRef()
  flushLinksTimeout: any = null

  prev:any

  componentDidMount() {
    this.prev = window.scrollY
    window.addEventListener('scroll', e => this.handleNavigation(e))
    this.updateSecondaryLinks()
  }

  componentWillUnmount = () =>
    window.removeEventListener('scroll', e => this.handleNavigation(e))

  componentDidUpdate = (prevProps: { location: Object }) =>
    this.props.location !== prevProps.location &&
      this.updateSecondaryLinks()


  updateSecondaryLinks = (pathToShow?: string) =>
    this.setState({
      secondaryLinks: (path =>
        path.match(/\/festival*|\/program|\/user*/) ?
          path.match(/\/user*/) && _.isEmpty(this.context.user) ?
            []
            :
            Object.keys(defaultMessages[camelize(path.split('/')[1])].pages)
              .filter(key => key !== 'Projects')
              .map(key => ({
                to: `/${path.split('/')[1].toLowerCase()}/${key.toLowerCase()}`,
                id: `${camelize(path.split('/')[1])}.pages.${key}.name`
              }))
          :
          []
      )(pathToShow || this.props.history.location.pathname)
    })

  initFlushLinksTimeout = () =>
    this.flushLinksTimeout = setTimeout(this.updateSecondaryLinks, 350)

  breakFlushLinksTimeout = () => {
    if (this.flushLinksTimeout !== null) {
      clearTimeout(this.flushLinksTimeout)
      this.flushLinksTimeout = null
    }
  }

  handleNavigation = (e: any) => {
    const window = e.currentTarget

    if (this.prev > window.scrollY && window.scrollY > window.innerHeight) {
      this.setState({ scrollingUp: true })
    } else if (this.prev < window.scrollY) {
      this.setState({ scrollingUp: false })
    }
    this.prev = window.scrollY
  }

  renderHeader = (className?: string) =>
    <header className={`Header ${className} ${this.state.secondaryLinks.length > 0 && 'Header--secondary'}`}>
      <div className="Header__main">
        <div className="Header__container">
          
          <Link
            to="/"
            className="Header__logo"
            activeClassName="Link--active"
          >
            <img
              alt=''
              className="Header__logo__img"
              src={logo}
            />
            <FormattedMessage
              className="Header__logo__name"
              id="AccessPoint"
            />
          </Link>

          <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
            <div
              className={`
                Header__links__item Header__links__item--dropdown
                ${this.state.secondaryLinks.length === 3 && 'button--navigation--hover'}
                ${this.props.location.pathname.includes('program') && 'Header__links__item--active'}
              `}
              onMouseEnter={() => {
                this.breakFlushLinksTimeout()
                this.updateSecondaryLinks('/program')
              }}
              onMouseLeave={this.initFlushLinksTimeout}
            >
              <FormattedMessage id="Program.name" />
            </div>
            <Link
              to="/schedule"
              className="Header__links__item"
              activeClassName="Header__links__item--active"
              onClick={() => this.setState({ opened: false })}
            >
              <FormattedMessage id="Schedule.name" />
            </Link>
            <div
              className={`
                Header__links__item Header__links__item--dropdown
                ${this.state.secondaryLinks.length === 5 && 'button--navigation--hover'}
                ${this.props.location.pathname.includes('festival') && 'Header__links__item--active'}
              `}
              onMouseEnter={() => {
                this.breakFlushLinksTimeout()
                this.updateSecondaryLinks('/festival')
              }}
              onMouseLeave={this.initFlushLinksTimeout}
            >
              <FormattedMessage id="Festival.name" />
            </div>
          </div>

          <div className="Header__controls">
            <button
              className="Header__controls__item Header__controls__item--locale"
              onClick={this.context.toggleLocale}
            >
              <LocaleIcon className="Header__controls__item__icon" />
              <FormattedMessage id={this.context.locale === "rus" ? "locale.eng" : "locale.rus"} />
            </button>
            <Link
              to={!_.isEmpty(this.context.user) ? "/user/tickets" : "/login"}
              className={`
                Header__controls__item
                Header__controls__item--login
                ${(this.props.history.location.pathname.includes('/user/')
                  || this.props.history.location.pathname.includes('/login'))
                  && "Header__controls__item Header__controls__item--active"}
              `}
            >
              <UserLineIcon className="Header__controls__item__icon" />
              {!_.isEmpty(this.context.user) ?
                this.context.user.name
                :
                <FormattedMessage id="login" />
              }
            </Link>
          </div>

          <div
            className="Header__burger"
            onClick={() => this.setState({
              opened: !this.state.opened
            })}
          />

        </div>
      </div>

      {this.renderSecondary()}
    </header>

  renderSecondary = () =>
    <div
      ref={this.secondaryRef}
      onMouseEnter={this.breakFlushLinksTimeout}
      onMouseLeave={this.initFlushLinksTimeout}
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
              className="Header__links__item"
              activeClassName='button--navigation--hover'
              onClick={() => this.setState({ opened: false })}
            >
              <FormattedMessage id={props.id} />
            </Link>
        }
      />
    </div>

  render = () =>
    <>
      {this.renderHeader()}
      {this.renderHeader(`Header--fixed ${this.state.scrollingUp && "Header--fixed--show"}`)}
    </>
}


export default withRouter(Header)