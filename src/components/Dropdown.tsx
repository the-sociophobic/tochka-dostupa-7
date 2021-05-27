import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import { ReactComponent as Plus } from '../styles/img/plus.svg'


type Props = {
  title: string | JSX.Element
  className?: string
  initialOpen?: boolean
  opened?: boolean
  toggleOpened?: Function
  spekt?: boolean
}


class Dropdown extends React.Component<Props, {}> {
  state = {
    opened: this.props.initialOpen || this.props.opened || false,
    contentHeight: 0,
  }

  titleRef: any = React.createRef()
  contentRef: any = React.createRef()
  resizeObs: any

  componentDidMount() {
    this.resizeObs = new ResizeObserver(this.updateContentHeight.bind(this))
      .observe(this.contentRef.current)
  }

  componentDidUpdate = (prevProps: any) =>
    this.props.opened !== prevProps.opened &&
      this.setState({opened: this.props.opened})

  updateContentHeight = () =>
    this.setState({
      contentHeight: this.contentRef?.current?.clientHeight
    })

  toggleOpened = () => {
    if (!this.state.opened)
      setTimeout(() => window.scroll({
        top: this.titleRef?.current?.getBoundingClientRect()?.top + window.scrollY - 200,
        behavior: 'smooth'
      }), 250)
      

    this.props.toggleOpened ?
      this.props.toggleOpened()
      :
      this.setState({ opened: !this.state.opened })
  }

  render = () =>
    this.props.children &&
      <div
        ref={this.titleRef}
        className={`
          Dropdown
          ${this.state.opened && "Dropdown--opened"}
          ${this.props.spekt && 'Dropdown--spekt'}
          ${this.props.className}
        `}
      >
        <div
          className='Dropdown__title'
          onClick={() => this.props.spekt && this.toggleOpened()}
        >
          <div
            className="Dropdown__title__text"
            onClick={() => !this.props.spekt && this.toggleOpened()}
          >
            {this.props.title}
            {this.props.spekt &&
              <Plus className='Dropdown__title__text__Plus' />}
          </div>
        </div>
        <div
          className="Dropdown__content"
          style={{
            height: this.state.opened ?
              this.state.contentHeight
              :
              0
          }}
        >
          <div
            className="Dropdown__content__container"
            ref={this.contentRef}
          >
            {this.props.children}
          </div>
        </div>
      </div>
}


export default Dropdown