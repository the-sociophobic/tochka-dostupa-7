import React from 'react'

import _ from 'lodash'

import Link from './Link'
import {
  Left,
  Right
} from './buttons'
import { Context } from './Store'


type Props = {
  items: any[]
  Card: React.FunctionComponent<any>
  title?: string | JSX.Element
  bottomLink?: {
    to: string
    label: string | JSX.Element
  }
  L?: boolean
  M?: boolean
  S?: boolean
}


class HorizontalShowcase extends React.Component<Props, {}> {

  static contextType = Context

  renderArrows = (className?: string) =>
    <div className={className}>
      <Left />
      <Right />
    </div>

  render = () =>
    <div className='HorizontalShowcase'>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-row underline">
              <h2 className="h2 mr-auto">
                {this.props.title}
              </h2>
              {this.renderArrows('d-none d-md-inline-block')}
            </div>
          </div>
        </div>
      </div>

      <div className='row d-md-none'>
        <div className='col-4'>
          {this.renderArrows()}
        </div>
      </div>

      <div className="HorizontalShowcase__scroll">
        <div className="HorizontalShowcase__scroll__container">
          {this.props.items.map(item =>
            <this.props.Card
              className={`
                HorizontalShowcase__item
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
}


export default HorizontalShowcase