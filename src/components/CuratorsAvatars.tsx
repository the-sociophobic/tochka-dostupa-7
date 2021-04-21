import React from 'react'

import { Person } from './Store/Types'


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
          <div className='CuratorsAvatars__item'>
            <img
              className='CuratorsAvatars__item__avatar'
              src={curator?.avatar?.file?.url}
              alt={curator?.avatar?.file?.fileName}
            />
          </div>
        )}
    </div>
}


export default CuratorsAvatars