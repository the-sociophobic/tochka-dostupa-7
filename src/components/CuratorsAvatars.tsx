import React from 'react'

import { Person } from './Store/Types'
import Img from './Img'


type Props = {
  curators: Person[] | undefined
  className?: string
  S?: boolean
  M?: boolean
  L?: boolean
}


class CuratorsAvatars extends React.Component<Props, {}> {

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
            />
          </div>
        )}
    </div>
}


export default CuratorsAvatars