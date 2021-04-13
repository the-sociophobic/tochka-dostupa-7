import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'


type Props = {
  title: string | JSX.Element
  className?: string
  initialOpen?: boolean
  spekt?: boolean
}


class Dropdown extends React.Component<Props, {}> {
  state = {
    opened: this.props.initialOpen || false,
    contentHeight: 0,
  }

  contentRef: any = React.createRef()
  resizeObs: any

  componentDidMount() {
    this.resizeObs = new ResizeObserver(this.updateContentHeight.bind(this))
      .observe(this.contentRef.current)
  }

  updateContentHeight = () =>
    this.setState({
      contentHeight: this.contentRef?.current?.clientHeight
    })

  toggleOpened = () =>
    this.setState({ opened: !this.state.opened })

  render = () =>
    <div className={`
      Dropdown
      ${this.state.opened && "Dropdown--opened"}
      ${this.props.spekt && 'Dropdown--spekt'}
      ${this.props.className}
    `}>
      <div
        className='Dropdown__title'
        onClick={() => this.props.spekt && this.toggleOpened()}
      >
        <div
          className="Dropdown__title__text"
          onClick={() => !this.props.spekt && this.toggleOpened()}
        >
          {this.props.title}
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