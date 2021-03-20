import React from 'react'

import FormattedMessage from './FormattedMessage'


const Online : React.FunctionComponent<{
  className?: string,
  onClick?: Function,
  disabled?: boolean,
}> = ({
  className,
  onClick,
  disabled,
}) =>
  <button
    className={`button button--online ${className}`}
    onClick={() => !disabled && onClick?.()}
    disabled={disabled}
  >
    <FormattedMessage id='online' />
  </button>
  
const Offline : React.FunctionComponent<{
  className?: string,
  onClick?: Function,
  disabled?: boolean,
}> = ({
  className,
  onClick,
  disabled,
}) =>
  <button
    className={`button button--offline ${className}`}
    onClick={() => !disabled && onClick?.()}
    disabled={disabled}
  >
    <FormattedMessage id='offline' />
  </button>

const Age : React.FunctionComponent<{
  number: number | string,
  className?: string,
  onClick?: Function,
  disabled?: boolean,
}> = ({
  number,
  className,
  onClick,
  disabled,
}) =>
  <button
    className={`button button--age ${className}`}
    onClick={() => !disabled && onClick?.()}
    disabled={disabled}
  >
    {number}+
  </button>

const Left : React.FunctionComponent<{
  className?: string,
  onClick?: Function,
  disabled?: boolean,
}> = ({
  className,
  onClick,
  disabled,
}) =>
  <button
    className={`button button--arrow button--arrow--left ${className}`}
    onClick={() => !disabled && onClick?.()}
    disabled={disabled}
  />

const Right : React.FunctionComponent<{
  className?: string,
  onClick?: Function,
  disabled?: boolean,
}> = ({
  className,
  onClick,
  disabled,
}) =>
  <button
    className={`button button--arrow button--arrow--right ${className}`}
    onClick={() => !disabled && onClick?.()}
    disabled={disabled}
  />


export {
  Online,
  Offline,
  Age,
  Left,
  Right,
}