import React from 'react'

import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import Link from '../components/Link'
import { Context } from '../components/Store'
import { post } from '../utils/API'
import validatePhone from '../utils/validatePhone'
import validateEmail from '../utils/validateEmail'


type Props = RouteComponentProps<{
  param1: string,
}>

type State = {
  emailPhoneInputString: string
  codeInputString: string
  stage: number
  higlightError: boolean
  resendCountdown: number
}


class Login extends React.Component<Props, State> {

  state: State = {
    // emailPhoneInputString: 'torikowashi@gmail.com',
    // emailPhoneInputString: '+79217406762',
    emailPhoneInputString: '',
    codeInputString: '',
    stage: 0,
    higlightError: false,
    resendCountdown: 30,
  }
  
  static contextType = Context

  checkInterval: any
  resendCountdownInterval: any

  checkIfLogged = () => {
    if (this.checkInterval) {
      if (!_.isEmpty(this.context.user))
        clearInterval(this.resendCountdownInterval)
      return
    }

    let tries = 0

    this.checkInterval = setInterval(() => {
      if (!_.isEmpty(this.context.user) || tries > 10) {
        clearInterval(this.checkInterval)
        // if (this.props.history.location.pathname === '/login')
          this.props.history.push('/user/tickets')
      }
      this.context.checkUser()
      tries++
    }, 500)
  }

  componentDidMount = () => this.initializeCountdown()

  loginWithEmailPhone = async () => {
    if (!validatePhone(this.state.emailPhoneInputString) && !validateEmail(this.state.emailPhoneInputString)) {
      this.setState({ higlightError: true })
      return
    }

    const res = await post('/login', {
      [validatePhone(this.state.emailPhoneInputString) ? 'phone' : 'email']: this.state.emailPhoneInputString,
      sessionToken: this?.context?.cookies?.get('sessionToken')
    })

    console.log(res)

    if (!res.error) {
      this.setState({ stage: 1 })
      this.initializeCountdown()
    }
  }

  initializeCountdown = () => {
    this.setState({ resendCountdown: 30 })
    this.resendCountdownInterval = setInterval(() => {
      if (this.state.resendCountdown === 1)
        clearInterval(this.resendCountdownInterval)

      this.setState({ resendCountdown: this.state.resendCountdown - 1 })
    }, 1000)
  }

  loginWithCode = async () => {
    const res = await post('/login-with-code', {
      phone: '',
      sessionToken: this?.context?.cookies?.get('sessionToken')
    })

    console.log(res)

    if (res.hasOwnProperty('user'))
      this?.context?.setState({ user: res.user })
  }


  renderStage0 = (page: any) =>
    <div className="Login__container">
      <div className="Login__main">
        <div className="Login__main__h2">
          {page.name}
        </div>
        <div className='text-center p p--m my-s'>
          {page.loginDesc}
        </div>
        <div className="Login__main__controls">
          <input
            className={`Login__input ${this.state.higlightError && 'Login__input--error'}`}
            value={this.state.emailPhoneInputString}
            onChange={e => this.setState({
              emailPhoneInputString: e.target.value.replace(/[^(A-Z|a-z|0-9\.\@\+)]+/g, ''),
              higlightError: false,
            })}
            placeholder={page.loginPlaceholder}
          />
          <button
            className='button button--main pt-0'
            onClick={this.loginWithEmailPhone}
          >
            {page.getPassword}
          </button>
        </div>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <div className='delimeter' />
        <div className='Login__small'>
          Или авторизируйтесь через
        </div>
        <div className='delimeter' />
      </div>
      <Link
        className="Login__main__controls__button"
        to={`https://t.me/AccessPointBot?start=${this.context.sessionToken}`}
        disabled={!this.context.sessionToken}
        onClick={() => this.checkIfLogged()}
      >
        Telegram
      </Link>
    </div>

  renderStage1 = (page: any) =>
    <div className="Login__container">
      <div className="Login__main">
        <div
          className='Login__main__back'
          onClick={() => this.setState({ stage: 0 })}
        >
          {page.back}
        </div>
        <div className="Login__main__h2">
          {page.name}
        </div>
        <div className='text-center p p--m my-s'>
          {page.getPasswordDesc}
        </div>
        <div className="Login__main__controls">
          <input
            className={`Login__input ${this.state.higlightError && 'Login__input--error'}`}
            value={this.state.codeInputString}
            onChange={e => this.setState({
              codeInputString: e.target.value.replace(/[^(0-9)]+/g, '').slice(0, 4),
              higlightError: false,
            })}
            placeholder={page.codePlaceholder}
          />
          <button
            className='button button--main pt-0'
            onClick={this.loginWithCode}
          >
            {page.login}
          </button>
        </div>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <div className='delimeter' />
        <div className='Login__small'>
          {page.didntGetPassword}
        </div>
        <div className='delimeter' />
      </div>
      <button
        className='button button--main pt-0'
        onClick={() => {
          this.loginWithEmailPhone()
          this.initializeCountdown()
        }}
        disabled={this.state.resendCountdown > 0}
      >
        {this.state.resendCountdown > 0 ?
          `${page.receiveAgain} ${this.state.resendCountdown}`
          :
          page.getAgain
        }
      </button>
    </div>


  render = () => {
    if (!this?.context?.ready)
      return ''

    const page = this?.context?.contentful?.accountPages?.[0]

    return (
      <div className="Login">
        {this.state.stage === 0 && this.renderStage0(page)}
        {this.state.stage === 1 && this.renderStage1(page)}
      </div>
    )
  }
}


export default withRouter(Login)