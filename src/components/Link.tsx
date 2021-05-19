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
  location
}) =>
  disabled || !to ?
    <span
      className={`Link Link--disabled ${className}`}
      style={style}
      onClick={() => onClick?.()}
    >
      {children}
    </span>
    :
    to.match(/http*|tel:*|mailto:*|\#[a-zA-Z]+/) ?
      <a
        className={`Link ${className}`}
        style={style}
        href={to}
        target={sameTab ? "" : "_blank"}
        rel="noopener noreferrer"
        onClick={() => onClick?.()}
      >
        {children}
      </a>
      :
      activeClassName ?
        <NavLink
          exact={typeof exact !== 'undefined' ? exact : true}
          to={to + location.search}
          className={`Link ${className}`}
          activeClassName={`Link--active ${activeClassName}`}
          style={style}
          onClick={() => onClick?.()}
        >
          {children}
        </NavLink>
        :
        <Link
          to={to + location.search}
          className={`Link ${className}`}
          style={style}
          onClick={() => onClick?.()}
        >
          {children}
        </Link>


export default withRouter(_Link)