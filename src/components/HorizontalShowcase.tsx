import React from 'react'

// import _ from 'lodash'
// import ResizeObserver from 'resize-observer-polyfill'

import Link from './Link'
import {
  Left,
  Right
} from './buttons'
import { Context } from './Store'


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


class HorizontalShowcase extends React.Component<Props, {}> {

  state = {
    index: 0
  }

  static contextType = Context

  resizeObs: any

  scrollRef: React.RefObject<HTMLInputElement> = React.createRef()

  move = (offset: number) =>
    this.setState({
      index: this.state.index + offset})
    
  renderArrows = (className?: string) =>
    <div className={className}>
      <Left
        className='mr-3'
        onClick={() => this.move(-1)}
        disabled={this.state.index <= 0}
      />
      <Right
        onClick={() => this.move(1)}
        disabled={this.state.index >= (this?.props?.items?.length || 0) - 1}
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
                  {this.props.arrows && this.renderArrows('d-none d-md-inline-flex flex-row')}
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
          className={`HorizontalShowcase__scroll ${this.props.arrows && 'overflow-hidden'}`}
        >
          <div className="HorizontalShowcase__scroll__container">
            {this.props.items?.map((item, index) =>
              <ItemComp
                index={index}
                className={`
                  HorizontalShowcase__item
                  ${this.props.XXL && 'HorizontalShowcase__item--XXL'}
                  ${this.props.XL && 'HorizontalShowcase__item--XL'}
                  ${this.props.L && 'HorizontalShowcase__item--L'}
                  ${this.props.M && 'HorizontalShowcase__item--M'}
                  ${this.props.S && 'HorizontalShowcase__item--S'}
                  ${index < this.state.index && 'HorizontalShowcase__item--moved'}
                `}
                {...item}
              />
            )}
          </div>
          {this.state.index < (this?.props?.items?.length || 0) - 2 &&
            <div
              className='HorizontalShowcase__scroll__corner'
              onClick={() => this.move(1)}
            />
          }
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