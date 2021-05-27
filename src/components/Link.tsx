import React from 'react'

import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom'
import { RouteComponentProps } from 'react-router'


type PathParamsType = {
  param1: string,
}

type Props = RouteComponentProps<PathParamsType> & {
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
  location,
  outerRef,
  ...other
}) =>
  disabled || !to ?
    <span
      ref={outerRef}
      className={`Link Link--disabled ${className}`}
      style={style}
      onClick={(e: any) => onClick?.(e)}
      {...other}
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
        {...other}
      >
        {children}
      </a>
      :
      activeClassName ?
        <NavLink
          ref={outerRef}
          exact={typeof exact !== 'undefined' ? exact : true}
          to={to + location.search}
          className={`Link ${className}`}
          activeClassName={`Link--active ${activeClassName}`}
          style={style}
          onClick={(e: any) => onClick?.(e)}
          {...other}
        >
          {children}
        </NavLink>
        :
        <Link
          ref={outerRef}
          to={to + location.search}
          className={`Link ${className}`}
          style={style}
          onClick={(e: any) => onClick?.(e)}
          {...other}
        >
          {children}
        </Link>


export default withRouter(_Link)