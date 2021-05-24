import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import Link from './Link'
import {
  Left,
  Right
} from './buttons'
import { Context } from './Store'
import clip from '../utils/clip'


type Props = {
  items: any[] | undefined
  ItemComp: React.FunctionComponent<any | {item: any, index?: number, className?: string}>
  className?: string
  title?: string | JSX.Element
  arrows?: boolean
  XXL?: boolean
  XL?: boolean
  L?: boolean
  M?: boolean
  S?: boolean
  bottomLink?: {
    to: string
    label: string | JSX.Element
  }
}

type State = {
  index: number

  scrollWidth: number
  containerWidth: number
  leftPadding: number
  itemWidth: number
  currentScroll: number
  scrollbarWidth: number
  scrollbarLeft: number
  scrollbarCursorStart: number
  scrollbarDragStart: number
  currentlyScrolling: boolean
}


const gutterWidth = 24


class HorizontalShowcase extends React.Component<Props, State> {

  state: State = {
    index: 0,

    scrollWidth: 0,
    containerWidth: 0,
    leftPadding: 0,
    itemWidth: 0,
    currentScroll: 0,
    scrollbarWidth: 0,
    scrollbarLeft: 0,
    scrollbarCursorStart: 0,
    scrollbarDragStart: -1,
    currentlyScrolling: false
  }

  static contextType = Context

  resizeObs: any

  scrollTimeout: any

  scrollRef: any = React.createRef()
  containerRef: any = React.createRef()
  scrollbarRef: any = React.createRef()
  itemsRefs: any[] = Array
    .apply(null, Array(this?.props?.items?.length || 0))
    .map(ref => React.createRef())

  componentDidMount = () => {
    if (this.props.arrows) {
      this.scrollRef?.current?.addEventListener('scroll', this.handleScroll)
      this.resizeObs = new ResizeObserver(this.handleResize.bind(this))
        .observe(this.scrollRef.current)

      // this.scrollRef?.current?.addEventListener("touchend", this.scrollStop, false)
      this.scrollbarRef?.current?.addEventListener("mousedown", this.scrollbarClickStart, false)
      window.addEventListener("mouseup", this.scrollbarClickEnd, false)
      window.addEventListener('mousemove', this.scrollbarMouseMove)
    }
  }
    
  componentWillUnmount = () => {
    if (this.props.arrows) {
      this.scrollRef?.current?.removeEventListener('scroll', this.handleScroll)
      // this.scrollRef?.current?.removeEventListener("touchend", this.scrollStop, false)
      this.scrollbarRef?.current?.removeEventListener("mousedown", this.scrollbarClickStart, false)
      window.removeEventListener("mouseup", this.scrollbarClickEnd, false)
      window.removeEventListener('mousemove', this.scrollbarMouseMove)
    }
  }

  handleResize = () => {
    if (!this.itemsRefs?.[0]?.current)
      return

    const leftPadding = parseInt(
      window.getComputedStyle(this.scrollRef.current.children[0], null)
        .getPropertyValue('padding-left')
        .replace('px', ''))

    this.setState({
      scrollWidth: this.scrollRef.current.clientWidth,
      containerWidth: this.containerRef.current.clientWidth,
      currentScroll: this.scrollRef.current.scrollLeft,
      itemWidth: this.itemsRefs[0].current.clientWidth,
      leftPadding: leftPadding,
      scrollbarWidth: (this.scrollRef.current.clientWidth / this.containerRef.current.clientWidth) * (this.scrollRef.current.clientWidth - leftPadding * 2)
    })
  }
      

  handleScroll = () => {
    // clearTimeout(this.scrollTimeout)
    // this.scrollTimeout = setTimeout(() => this.move(0), 66)
    if (!this.itemsRefs?.[0]?.current)
      return

    const currentScroll = this.scrollRef.current.scrollLeft
    const {
      itemWidth,
      leftPadding,
      scrollbarWidth,
      scrollWidth,
      containerWidth,
    } = this.state
    
    this.setState({
      currentScroll: currentScroll,
      index: Math.ceil(currentScroll / (itemWidth + gutterWidth))
    })

    if (this.state.scrollbarDragStart === -1)
      this.setState({
        scrollbarLeft: (currentScroll / (containerWidth - scrollWidth)) * (scrollWidth - leftPadding * 2 - scrollbarWidth)
      })
  }

  scrollStop = () =>
    this.move(0)

  scrollbarClickStart = (e: any) => {
    this.setState({
      scrollbarCursorStart: e.clientX,
      scrollbarDragStart: this.state.scrollbarLeft
    })
  }

  scrollbarMouseMove = (e: any) => {
    if (this.state.scrollbarDragStart === -1)
     return

    const {
      leftPadding,
      scrollbarWidth,
      scrollWidth,
      containerWidth,
    } = this.state
    const maxScrollbarLeft = scrollWidth - leftPadding * 2 - scrollbarWidth
    const newScrollbarLeft = clip(
      this.state.scrollbarDragStart + e.clientX - this.state.scrollbarCursorStart,
      0,
      maxScrollbarLeft)

    this.setState({
      scrollbarLeft: newScrollbarLeft
    })

    this.scrollRef?.current?.scroll?.((newScrollbarLeft / maxScrollbarLeft) * (containerWidth - scrollWidth), 0)
  }

  scrollbarClickEnd = (e: any) => {
    this.setState({
      scrollbarCursorStart: 0,
      scrollbarDragStart: -1
    })
  }

  itemOffset = (index: number) =>
    this.itemsRefs[index]?.current?.offsetLeft || 0

  move = (offset: number) => {
    const { leftPadding } = this.state

    if (!this.state.currentlyScrolling)
      this.scroll(this.itemOffset(this.state.index + offset) - (leftPadding || 0))
  }

  scroll = (finalPos: number, startPos?: number, currentFrame: number = 0, maxFrames: number = 12) => {
    this.setState({
      currentlyScrolling: true
    })

    if (currentFrame > maxFrames) {
      this.setState({
        currentlyScrolling: false
      })  
      return
    }

    if (typeof startPos !== 'undefined')
      this.scrollRef?.current?.scroll(startPos + (finalPos - startPos) * currentFrame / maxFrames, 0)
    
    const currentScroll = this.scrollRef?.current?.scrollLeft

    window.requestAnimationFrame(() =>
      this.scroll(
        finalPos,
        startPos || currentScroll,
        currentFrame + 1,
        maxFrames
      )
    )
  }

  itemInTheCorner = (index: number) =>
    this.itemOffset(index) >= (this.state.currentScroll + this.state.scrollWidth - this.state.leftPadding - this.state.itemWidth)
    && this.itemOffset(index) <= (this.state.currentScroll + this.state.scrollWidth - this.state.leftPadding)

  cornerHandleClick = (e: any, index: number) => {
    if (!this.itemInTheCorner(index))
      return
      
    e?.preventDefault()
    this.move(1)
  }

  renderArrows = (className?: string) =>
    <div className={className}>
      <Left
        className='mr-3'
        onClick={() => this.move(-1)}
        disabled={this.state.index <= 0}
      />
      <Right
        onClick={() => this.move(1)}
        disabled={this.state.containerWidth - this.state.scrollWidth <= this.state.currentScroll}
      />
    </div>

  render = () => {
    const { ItemComp } = this.props

    return (
      <div className={`HorizontalShowcase ${this.props.className}`}>

        {this.props.title &&
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-row underline">
                  <h2 className="h2 mr-auto">
                    {this.props.title}
                  </h2>
                  {this.props.arrows &&
                    this.renderArrows('d-none d-md-inline-flex flex-row')}
                  {this.props.arrows &&
                    <div
                      ref={this.scrollbarRef}
                      className='HorizontalShowcase__scrollbar'
                      style={{
                        width: this.state.scrollbarWidth, 
                        left: this.state.scrollbarLeft,
                      }}
                    />
                  }
                </div>
              </div>
            </div>
            {this.props.arrows &&
              <div className='row d-md-none mb-s'>
                <div className='col-4'>
                  {this.renderArrows('d-flex flex-row')}
                </div>
              </div>
            }
          </div>
        }

        <div
          ref={this.scrollRef}
          className='HorizontalShowcase__scroll'
        >
          <div
            ref={this.containerRef}
            className="HorizontalShowcase__scroll__container"
          >
            {this.props.items?.map((item, index) =>
              <ItemComp
                outerRef={this.itemsRefs[index]}
                key={item.id || index}
                index={index}
                className={`
                  HorizontalShowcase__item
                  ${this.props.XXL && 'HorizontalShowcase__item--XXL'}
                  ${this.props.XL && 'HorizontalShowcase__item--XL'}
                  ${this.props.L && 'HorizontalShowcase__item--L'}
                  ${this.props.M && 'HorizontalShowcase__item--M'}
                  ${this.props.S && 'HorizontalShowcase__item--S'}
                  ${this.itemInTheCorner(index) && 'HorizontalShowcase__scroll__corner'}
                `}
                onClick={(e: any) => this.cornerHandleClick(e, index)}
                {...item}
              />
            )}
          </div>
          {/* {(this.props.arrows && this.state.index < (this?.props?.items?.length || 0) - 2) &&
            <div
              className='HorizontalShowcase__scroll__corner'
              onClick={() => this.move(1)}
            />
          } */}
        </div>

        {this.props.bottomLink &&
          <div className="container mt-xxs mt-md-xs">
            <div className="row">
              <div className="col-4 col-md-6 col-lg-4 col-xl-3">
                <Link
                  to={this.props.bottomLink.to}
                  className='button button--main'
                >
                  {this.props.bottomLink.label}
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}


export default HorizontalShowcase