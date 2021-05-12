import React from 'react'

import _ from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'

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

  static contextType = Context

  resizeObs: any

  itemsRefs: React.RefObject<HTMLInputElement>[] | undefined =
    this.props.arrows && this.props.items ?
      this.props.items.map(item => React.createRef())
      :
      undefined

  renderArrows = (className?: string) =>
    <div className={className}>
      <Left className='mr-3' />
      <Right />
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

        <div className="HorizontalShowcase__scroll">
          <div className="HorizontalShowcase__scroll__container">
            {this.props.items?.map((item, index) =>
              <ItemComp
                ref={this?.itemsRefs?.[index]}
                index={index}
                className={`
                  HorizontalShowcase__item
                  ${this.props.XXL && 'HorizontalShowcase__item--XXL'}
                  ${this.props.XL && 'HorizontalShowcase__item--XL'}
                  ${this.props.L && 'HorizontalShowcase__item--L'}
                  ${this.props.M && 'HorizontalShowcase__item--M'}
                  ${this.props.S && 'HorizontalShowcase__item--S'}
                `}
                {...item}
              />
            )}
          </div>
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