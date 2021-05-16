import React from 'react'

import { Context } from './Store'


class Loader extends React.Component {

  state = {
    transparent: false,
    hidden: false
  }

  static contextType = Context

  componentDidMount = () =>
    this?.context?.registerInitializeCallback(() => this.hide())

  hide = () => {
    this.setState({ transparent: true })
    setTimeout(
      () => this.setState({ hidden: true })
      , 900)
  }

  render = () =>
    <div className={`
      Loader
      ${this.state.transparent && 'Loader--transparent'}
      ${this.state.hidden && 'd-none'}
    `}>
      <div className='Loader__squircles'>
        <div className='Loader__squircles__item Loader__squircles__item--0' />
        <div className='Loader__squircles__item Loader__squircles__item--1' />
        <div className='Loader__squircles__item Loader__squircles__item--2' />
        <div className='Loader__squircles__item Loader__squircles__item--3' />
        <div className='Loader__squircles__item Loader__squircles__item--4' />
      </div>
    </div>
}


export default Loader