import React from 'react'

import addNewLines from '../utils/addNewLines'
import { Context } from './Store'
import { getMessage } from './Store/locale'


type Props = {
  id?: string,
  message?: string[]
  className?: string,
  onClick?: Function,
}


class FormattedMessage extends
  React.Component<Props, {}> {

    static contextType = Context

    render = () =>
      <div
        className={`FormattedMessage ${this.props.className}`}
        onClick={() => this.props?.onClick?.()}
      >
        {this.props.id &&
          addNewLines(
            getMessage(this, this.props.id))}
        {this.props?.message?.
          [this.context.locale === 'rus' ? 0 : 1]}
      </div>
  }
  

export default FormattedMessage
