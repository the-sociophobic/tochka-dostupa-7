import React from 'react'

import logo from '../styles/img/logo.svg'
import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import Link from './Link'


const Footer : React.FunctionComponent = ({}) =>
  <footer className="Footer">
    <div className="Footer__container">
      <div className="Footer__row Footer__row--links">
        <div className="col-1" style={{background: 'red'}}>
          a
        </div>
        <div className="col-1" style={{background: 'green'}}>
          a
        </div>
        <div className="col-1" style={{background: 'red'}}>
          a
        </div>
        <div className="col-1" style={{background: 'green'}}>
          a
        </div>
      </div>
      <div className="Footer__row Footer__row--contacts">

      </div>
      <div className="Footer__row Footer__row--disclaimer">

      </div>
    </div>
  </footer>


export default Footer