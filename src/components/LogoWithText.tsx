import React from 'react'

import FormattedMessage from './FormattedMessage'
import { ReactComponent as Logo } from '../styles/img/logo.svg'


const LogoWithText: React.FunctionComponent = () =>
  <div className='LogoWithText'>
    <Logo className="LogoWithText__img" />
    <FormattedMessage
      className="LogoWithText__name"
      id="AccessPoint"
    />
  </div>


export default LogoWithText