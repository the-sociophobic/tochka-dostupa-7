import React from 'react'

import { Link } from 'gatsby'
// import { useQueryParam, BooleanParam } from 'use-query-params'

type Props = {
  className?: string
  activeClassName?: string
  style?: object
  to: string
  sameTab?: boolean
  children?: any
  onClick?: Function
  disabled?: boolean
  exact?: boolean
  outerRef?: any
}


const _Link : React.FunctionComponent<Props> = ({
  className,
  activeClassName,
  style,
  to,
  sameTab,
  children,
  onClick,
  disabled,
  exact,
  // location,
  outerRef,
}) => {
  // const [en, setEn] = useQueryParam('en', BooleanParam)
  const en = false

  return disabled || !to ?
    <span
      ref={outerRef}
      className={`Link Link--disabled ${className}`}
      style={style}
      onClick={(e: any) => onClick?.(e)}
    >
      {children}
    </span>
    :
    to.match(/http*|tel:*|mailto:*|#[a-zA-Z0-9]+/) ?
      <a
        ref={outerRef}
        className={`Link ${className}`}
        style={style}
        href={to}
        target={sameTab ? "" : "_blank"}
        // rel="noopener nouterReferrer"
        // rel={sameTab ? '' : 'noreferrer'}
        rel='noreferrer'
        onClick={(e: any) => onClick?.(e)}
      >
        {children}
      </a>
      :
      <Link
        ref={outerRef}
        partiallyActive={typeof exact !== 'undefined' ? !exact : false}
        to={to + en ? '?en' : ''}
        className={`Link ${className}`}
        activeClassName={`Link--active ${activeClassName}`}
        style={style}
        onClick={(e: any) => onClick?.(e)}
      >
        {children}
      </Link>
}


export default _Link