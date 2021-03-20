import React from 'react'

import {
  Link,
  NavLink
} from 'react-router-dom'


type Props = {
  className?: string
  activeClassName?: string
  to: string
  sameTab?: boolean
  children?: any
  onClick?: Function
  disabled?: boolean
}


const _Link : React.FunctionComponent<Props> = ({
  className,
  activeClassName,
  to,
  sameTab,
  children,
  onClick,
  disabled,
}) =>
  disabled ?
    <span className={`Link Link--disabled ${className}`}>
      {children}
    </span>
    :
    to.match(/http*|tel:*|mailto:*/) ?
      <a
        className={`Link ${className}`}
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
          exact
          to={to}
          className={`Link ${className}`}
          activeClassName={`Link--active ${activeClassName}`}
          onClick={() => onClick?.()}
        >
          {children}
        </NavLink>
        :
        <Link
          to={to}
          className={`Link ${className}`}
          onClick={() => onClick?.()}
        >
          {children}
        </Link>


export default _Link