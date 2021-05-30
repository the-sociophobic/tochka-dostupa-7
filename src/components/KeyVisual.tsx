import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import Img from '../components/Img'
import { File } from '../components/Store/Types'
import FormattedMessage from './FormattedMessage'
import LogoWithText from './LogoWithText'
import encodeUrlParams from '../utils/encodeUrlParams'
import { Context } from '../components/Store'


type Props = {
  imgs: File[]
}
type State = {
  scroll: number
  blockHeight: number
}


const maxImgs = 3


class KeyVisual extends React.Component<Props, State> {

  static contextType = Context

  state = {
    scroll: 0,
    blockHeight: 0
  }

  elementRef: any = React.createRef()
  resizeObs: any
  randomIndexes: number[] = []

  componentDidMount = () => {
    window.addEventListener('scroll', () => this.updateScroll())
    this.resizeObs = new ResizeObserver(this.updateContentHeight.bind(this))
      .observe(this.elementRef.current)
  }

  componentWillUnmount = () =>
    window.removeEventListener('scroll', () => this.updateScroll())

  updateScroll = () =>
    this.setState({
      scroll: window.scrollY
    })

  updateContentHeight = () =>
    this.setState({
      blockHeight: this.elementRef?.current?.clientHeight
    })


  renderBlock = () =>
    <div className='KeyVisual__block'>
      <div className='KeyVisual__block__container'>
        <div className='KeyVisual__block__name'>
          <FormattedMessage id='Home.keyvisual.name' />
        </div>
        <div className='KeyVisual__block__dates'>
          <FormattedMessage id='Home.keyvisual.dates' />
        </div>
        <div className='w-100 my-auto d-flex flex-row justify-content-center'>
          <LogoWithText />
        </div>
        <div className='p p--m text-uppercase'>
          <FormattedMessage id='Home.keyvisual.tickets' />
        </div>
      </div>
    </div>

  render = () => {
    if (this.context.ready && this.randomIndexes.length === 0)
      this.randomIndexes = this.props.imgs
        ?.sort(() => Math.random() - .5)
        ?.slice(3)
        ?.map((img: File, index: number) => index)

    return (
      <div
        className='KeyVisual'
        ref={this.elementRef}
      >
        <div
          className='KeyVisual__container'
          style={{
            left: `-${(this.state.blockHeight / 2) + this.state.scroll / 1.5}px`
          }}
        >
          {this.context.ready && this.randomIndexes?.map((randomIndex: number) =>
            <>
              <div className='KeyVisual__block'>
                <Img
                  className='w-100'
                  file={this.props.imgs[randomIndex]}
                  urlParams={`?fit=fill&${encodeUrlParams({
                    w: 684,
                    h: 684
                  })}`}
                />
              </div>
              {this.renderBlock()}
            </>
          )}
        </div>
      </div>
    )
  }
}


export default KeyVisual