import React from 'react'

import { Helmet as Helmet_ } from 'react-helmet'

import { Context } from './Store'
import { getMessage } from './Store/locale'


class Helmet extends React.Component {

  static contextType = Context

  render = () =>
    <Helmet_>
      <title>
        {getMessage(this, 'AccessPoint')} VII
      </title>
    </Helmet_>
}


export default Helmet