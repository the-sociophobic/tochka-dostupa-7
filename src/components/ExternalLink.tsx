import React from 'react'


type Props = {
  className?: string;
  to: string;
  newTab?: boolean;
  children: any;
}


const ExternalLink : React.FunctionComponent<Props> = ({
  className,
  to,
  newTab,
  children
}) =>
  <a
    className={className}
    href={to}
    target={newTab ? "_blank" : ""}
    rel="noopener noreferrer"
  >
    {children}
  </a>


export default ExternalLink