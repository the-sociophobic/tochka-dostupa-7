import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import FormattedMessage from '../components/FormattedMessage'
import Link from '../components/Link'
import { Context } from '../components/Store'


type PathParamsType = {
  param1: string,
}


class Login extends React.Component<RouteComponentProps<PathParamsType>> {
  
  static contextType = Context

  checkInterval:any

  checkIfLogged = () => {
    if (this.checkInterval)
      return

    let tries = 0

    this.checkInterval = setInterval(() => {
      if (this.context.user || tries > 10) {
        clearInterval(this.checkInterval)
        this.props.history.push('/user/tickets')
      }
      this.context.checkUser()
      tries++
    }, 300)
  }

  render = () =>
    <div className="Login">
      <div className="Login__container">
        <div className="Login__main">
          <FormattedMessage
            id="Login.main.h2"
            className="Login__main__h2"
          />
          <div className="Login__main__controls">
            <Link
              className="Login__main__controls__button"
              to={`https://t.me/AccessPointBot?start=${this.context.sessionToken}`}
              disabled={!this.context.sessionToken}
              onClick={() => this.checkIfLogged()}
            >
              <FormattedMessage id="login" />
            </Link>
          </div>
        </div>

      </div>
    </div>
}


export default withRouter(Login)