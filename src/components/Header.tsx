import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'
import { ReactComponent as LocaleIcon } from '../styles/img/locale.svg'
import { ReactComponent as UserLineIcon } from '../styles/img/user-line.svg'


type PathParamsType = {
  param1: string,
}


class Header extends React.Component<RouteComponentProps<PathParamsType>> {
  state = {
    opened: false,
    scrollingUp: false,
  }

  static contextType = Context

  prev:any

  componentDidMount() {
    this.prev = window.scrollY
    window.addEventListener('scroll', e => this.handleNavigation(e))
  }
  componentWillUnmount = () =>
    window.removeEventListener('scroll', e => this.handleNavigation(e))

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
    <header className={`Header ${className}`}>
      <div className="Header__main">
        <div className="Header__container">
          
          <Link
            to="/"
            className="Header__logo"
            activeClassName="Link--active"
          >
            <img
              className="Header__logo__img"
              src={logo}
            />
            <FormattedMessage
              className="Header__logo__name"
              id="AccessPoint"
            />
          </Link>

          <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
            <Link
              to="/schedule"
              className="Header__links__item"
              activeClassName="Header__links__item--active"
              onClick={() => this.setState({ opened: false })}
            >
              <FormattedMessage id="Header.schedule" />
            </Link>
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
              to={this.context.user ? "/user/tickets" : "/login"}
              className={`Header__controls__item Header__controls__item--login ${this.props.history.location.pathname.includes('/user/') && "Header__controls__item Header__controls__item--active"}`}
              // activeClassName="Header__controls__item Header__controls__item--active"
            >
              <UserLineIcon className="Header__controls__item__icon" />
              {this.context.user ?
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
    <div className="Header__secondary">
      <div className="Header__secondary__container">
        <div className="Header__secondary__container__inner">
          {(() => {
            const path = this.props.history.location.pathname

            switch(true) {
              case path.includes('/user/'):
                return <>
                  <Link
                    to="/user/tickets"
                    className="Header__secondary__item"
                    activeClassName="Header__secondary__item--active"
                  >
                    <FormattedMessage id="Header.user.tickets" />
                  </Link>
                  <Link
                    to="/user/admin"
                    className="Header__secondary__item"
                    activeClassName="Header__secondary__item--active"
                  >
                    <FormattedMessage id="Header.user.admin" />
                  </Link>
                  <Link
                    to="/user/settings"
                    className="Header__secondary__item"
                    activeClassName="Header__secondary__item--active"
                  >
                    <FormattedMessage id="Header.user.settings" />
                  </Link>
                  <button className="Header__secondary__item Header__secondary__item--exit">
                    <FormattedMessage id="Header.user.logout" />
                  </button>
                </>
              default:
                return <></>
            }
          })()}
        </div>
      </div>
    </div>

  render = () =>
    <>
      {this.renderHeader()}
      {this.renderHeader(`Header--fixed ${this.state.scrollingUp && "Header--fixed--show"}`)}
    </>
}


export default withRouter(Header)