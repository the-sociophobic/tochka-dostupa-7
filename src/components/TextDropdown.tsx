import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import FormattedMessage from './FormattedMessage'
import Link from './Link'
import { RichTextNode } from './Store/Types/contentfulTypes'


type Props = {
  // children: React.ReactElement<RichTextNode>[]
  children: any
  className?: string
  initialOpen?: boolean
  additionalContent: JSX.Element
  link: string
  shortDesc: JSX.Element
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
      {this.props?.shortDesc}
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
        <Link
          className={`TextDropdown__toggle p--arrow p--arrow--${this.state.opened ? 'left' : 'right'}`}
          // onClick={() => this.toggleOpened()}
          to={this.props.link}
        >
          <FormattedMessage id={this.state.opened ? 'Program.hideText' : 'Program.readText'} />
        </Link>
      </div>
      <div className='TextDropdown__additional-content'>
        {this.props.additionalContent}
      </div>
    </div>
}


export default TextDropdown