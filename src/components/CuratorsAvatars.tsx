import React from 'react'

import { Person } from './Store/Types'
import Img from './Img'
import encodeUrlParams from '../utils/encodeUrlParams'


type Props = {
  curators: Person[] | undefined
  className?: string
  S?: boolean
  M?: boolean
  L?: boolean
}


class CuratorsAvatars extends React.Component<Props, {}> {

  getSideSize = () =>
    this.props.S ?
      160
      :
      this.props.M ?
        280
        :
        384

  render = () =>
    <div className={`
      CuratorsAvatars
      ${this.props.className}
      ${this.props.S && 'CuratorsAvatars--S'}
      ${this.props.M && 'CuratorsAvatars--M'}
      ${this.props.L && 'CuratorsAvatars--L'}
    `}>
      {this.props?.curators
        ?.slice(0, 2)
        ?.map((curator: Person) =>
          <div
            key={curator.id}
            className='CuratorsAvatars__item'
          >
            <Img
              className='CuratorsAvatars__item__avatar'
              file={curator?.avatar}
              urlParams={`?fit=fill&${encodeUrlParams({
                w: this.getSideSize(),
                h: this.getSideSize()
              })}`}
            />
          </div>
        )}
    </div>
}


export default CuratorsAvatars