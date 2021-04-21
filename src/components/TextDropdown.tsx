import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import FormattedMessage from './FormattedMessage'

type RichTextNode = {
  props: {
    children: (string | any)[]
  }
}

type Props = {
  children: React.ReactElement<RichTextNode>[]
  className?: string
  initialOpen?: boolean
  additionalContent: JSX.Element
}

class TextDropdown extends React.Component<Props, {}> {
  state = {
    opened: this.props.initialOpen || false,
    contentFullHeight: 0,
    contentPreviewHeight: 0,
  }

  contentFullRef: any = React.createRef()
  contentPreviewRef: any = React.createRef()
  resizeObsFull: any
  resizeObsPreview: any

  componentDidMount = () => {
    this.resizeObsFull = new ResizeObserver(
      this.updateContentFullHeight.bind(this))
        .observe(this.contentFullRef.current)
    this.resizeObsPreview = new ResizeObserver(
      this.updateContentPreviewHeight.bind(this))
        .observe(this.contentPreviewRef.current)
  }

  updateContentFullHeight = () =>
    this.setState({
      contentFullHeight: this.contentFullRef?.current?.clientHeight
    })
  updateContentPreviewHeight = () =>
    this.setState({
      contentPreviewHeight: this.contentPreviewRef?.current?.clientHeight
    })

  cropChildren = () =>
    <>
      {this.props?.children?.[0]?.props.children[0].slice(0, 355)}...
    </>

  toggleOpened = () =>
    this.setState({ opened: !this.state.opened })

  render = () =>
    <div className={`
      TextDropdown
      ${this.state.opened && "TextDropdown--opened"}
      ${this.props.className}
    `}>
      <div className="TextDropdown__content">
        <div
          className='TextDropdown__content__container'
          style={{
            height: this.state.opened ?
              this.state.contentFullHeight
              :
              this.state.contentPreviewHeight
          }}
        >
          <div
            className="TextDropdown__content__container__full"
            ref={this.contentFullRef}
          >
            {this.props.children}
          </div>
          <div
            className="TextDropdown__content__container__preview"
            ref={this.contentPreviewRef}
          >
            {this.cropChildren()}
          </div>
        </div>
        <div
          className='TextDropdown__toggle'
          onClick={() => this.toggleOpened()}
        >
          <FormattedMessage id={this.state.opened ? 'Program.hideText' : 'Program.readText'} />
        </div>
      </div>
      <div className='TextDropdown__additional-content'>
        {this.props.additionalContent}
      </div>
    </div>
}


export default TextDropdown