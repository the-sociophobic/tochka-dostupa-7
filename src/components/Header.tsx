import React from 'react'

// import routes from '../utils/routes'
import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import Link from './Link'


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

  render = () =>
    <header className="Header">
      <div className="Header__container">
        <Link
          to="/"
          className="Header__logo"
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
        <div
          className="Header__burger"
          onClick={() => this.setState({
            opened: !this.state.opened
          })}
        />
        <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
          {navLinks.map(route =>
            <Link
              to={route.to}
              key={route.to}
              activeClassName="Link--active"
              onClick={() => this.setState({ opened: false })}
            >
              <FormattedMessage id={route.messageId} />
            </Link>
          )}
        </div>
      </div>
    </header>
}


export default Header