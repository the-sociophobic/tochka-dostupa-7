import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import Link from '../components/Link'
import { Context } from '../components/Store'


class Login extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () =>
    <div className="Login">
      <div className="Login__container">
        <div className="Login__main">
          <FormattedMessage
            id="Login.main.h2"
            className="Login__main__h2"
          />
          <Link
            className="Login__main__button"
            to={`https://t.me/AccessPointBot?start=${this.context.sessionToken}`}
            disabled={!this.context.sessionToken}
          >
            <FormattedMessage id="login" />
          </Link>
        </div>

      </div>
    </div>
}


export default Login