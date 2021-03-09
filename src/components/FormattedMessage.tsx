import React from 'react'

import addNewLines from '../utils/addNewLines'
import { Context } from './Store'
import { getMessage } from './Store/locale'


class FormattedMessage extends
  React.Component<{id: string, className?: string}, {}> {

    static contextType = Context

    render = () =>
      addNewLines(
        getMessage(this, this.props.id)
        , this.props.className)
  }
  

export default FormattedMessage
