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
}


const _Link : React.FunctionComponent<Props> = ({
  className,
  activeClassName,
  to,
  sameTab,
  children
}) =>
  to.includes('http') ?
    <a
      className={`Link ${className}`}
      href={to}
      target={sameTab ? "" : "_blank"}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  :
    activeClassName ?
      <NavLink
        to={to}
        className={`Link ${className}`}
        activeClassName={`Link--active ${activeClassName}`}
      >
        {children}
      </NavLink>
    :
      <Link
        to={to}
        className={`Link ${className}`}
      >
        {children}
      </Link>


export default _Link