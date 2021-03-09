import React from 'react'

// import routes from '../utils/routes'
import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'
import { ReactComponent as LocaleIcon } from '../styles/img/locale.svg'
import { ReactComponent as UserLineIcon } from '../styles/img/user-line.svg'


type State = {
  opened: boolean;
}

const navLinks = [
  {
    to: "",
    messageId: "AccessPoint",
  },
]


class Header extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      opened: false
    }
  }

  static contextType = Context

  render = () =>
    <header className="Header">
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
            to="/login"
            className="Header__controls__item Header__controls__item--login"
            activeClassName="Header__controls__item Header__controls__item--active"
          >
            <UserLineIcon className="Header__controls__item__icon" />
            <FormattedMessage id="login" />
          </Link>
        </div>

        <div
          className="Header__burger"
          onClick={() => this.setState({
            opened: !this.state.opened
          })}
        />

      </div>
    </header>
}


export default Header