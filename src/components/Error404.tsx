import React from 'react'

import Link from './Link'

import FormattedMessage from './FormattedMessage'
import LogoWithText from './LogoWithText'


class Error404 extends React.Component {

  render = () =>
    <div className='Error404'>
      <div className='Error404__blur Error404__blur--0'>
        <LogoWithText />
      </div>
      <div className='Error404__text'>
        <div className='Error404__blur Error404__blur--1'>
          <FormattedMessage id='Error404.line1' />
        </div>
        <div className='Error404__blur Error404__blur--2'>
          <FormattedMessage id='Error404.line2' />
        </div>
        <div className='Error404__blur Error404__blur--3'>
          <FormattedMessage id='Error404.line3' />
        </div>

        <Link to='/'>
          <button className='button button--main mt-l pt-0'>
            <FormattedMessage id='Error404.return' />
          </button>
        </Link>
      </div>
    </div>
}


export default Error404