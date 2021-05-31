import React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'


type Props = {
  to: string
} & RouteComponentProps<{
  param1: string,
}>



class Redirect extends React.Component<Props> {

  componentDidMount = () => {
    window.open(this.props.to, "_blank")
    this.props.history.goBack()
  }
  
  render = () =>
    <div />
}


export default withRouter(Redirect)