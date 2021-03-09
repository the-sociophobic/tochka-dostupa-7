import React from 'react'
import { NavLink } from "react-router-dom"

import routes from '../utils/routes'
import logo from '../styles/img/logo-with-name.svg'


type State = {
  opened: boolean;
}

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
        <img
          className="Header__logo"
          src={logo}
        />
        <div
          className="Header__burger"
          onClick={() => this.setState({
            opened: !this.state.opened
          })}
        />
        <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
          {routes.map(route =>
            <NavLink
              exact={route.link === "/"}
              to={route.link}
              className="Link"
              activeClassName="Link--active"
              onClick={() => this.setState({ opened: false })}
            >
              {route.label}
            </NavLink>
          )}
        </div>
      </div>
    </header>
}


export default Header