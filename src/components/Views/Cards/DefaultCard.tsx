import React from 'react'

import Link from '../../Link'
import Img from '../../Img'
import FormattedMessage from '../../FormattedMessage'


type Props = {
  onClick?(): void
  className?: string
  linkDisabled?: boolean
  link?: string
  model: {
    [key: string]: any
  }
  [key: string]: any
}


const DefaultCard: React.FunctionComponent<Props> = (props: Props) =>
  <Link
    to={props.link || ''}
    className={`DefaultCard ${props.className}`}
    disabled={props.linkDisabled}
    onClick={() => props?.onClick?.()}
  >
    {Object.keys(props.model)
      .map(key =>
        props.hasOwnProperty(key) &&
          <SingleProp
            prop={props[key]}
            type={props.model[key].type}
          />)}
  </Link>


type SinglePropProps = {
  type: string,
  prop: any
}

const SingleProp: React.FunctionComponent<SinglePropProps> = (props: SinglePropProps) => {
  switch (props.type) {
    case 'string':
      return <div className='d-inline-block'>{props.prop}</div>
    case 'number':
      return <div className='d-inline-block'>{props.prop}</div>
    default:
      return <div className='d-inline-block'>#unknown prop type#</div>
  }
}


export default DefaultCard