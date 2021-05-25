import React from 'react'

import { Location } from '@reach/router'


type Props = {
  location: any
}


class ScrollToTop extends React.Component<Props> {

  componentDidUpdate = (prevProps: { location: any }) =>
    this.props.location !== prevProps.location &&
      window.scrollTo(0, 0)

  render = () =>
    this.props.children
}


const ScrollToTopWithLocation = () =>
  <Location>
    {({location}) =>
      <ScrollToTop location={location} />
    }
  </Location>


export default ScrollToTopWithLocation