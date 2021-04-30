import React from 'react'

import Link from '../../Link'
import Img from '../../Img'
import {
  Online,
  Offline,
  Age,
} from '../../buttons'
import {
  Person,
  Spekt
} from '../../Store/Types'
import CuratorsAvatars from '../../CuratorsAvatars'


interface Props extends Spekt {
  onClick?(): void
  className?: string
  linkDisabled?: boolean
  avatarsL?: boolean
  avatarsM?: boolean
  avatarsS?: boolean
}


const SpektCard: React.FunctionComponent<Props> = (spekt: Props) =>
  <Link
    // to={spekt.link}
    to={`/spekt/${spekt.link}`}
    className={`SpektCard ${spekt.className}`}
    disabled={spekt.linkDisabled}
    onClick={() => spekt.onClick?.()}
  >
    <div className="SpektCard__name">
      {spekt.name}
    </div>
    <div className="SpektCard__makers">
      {(spekt?.personsObj
        ?.map((person: Person) =>
          <>{person.name}&nbsp;{person.surname}</>)
      || spekt?.persons?.split(', '))
        ?.map((maker: JSX.Element | string) =>
          <div
            className="SpektCard__makers__item"
          >
            {maker}
          </div>
        )
        ?.reduce((a, b) => <>{a}, {b}</>
      )}
    </div>
    <div className="SpektCard__short-desc">
      {spekt.shortDesc}
    </div>

    <div className="SpektCard__buttons">
      {spekt.offline && <Offline />}
      {spekt.online && <Online />}
      {spekt.age && <Age text={spekt.age} />}
    </div>

    {spekt?.personsObj ?
      <CuratorsAvatars
        L={spekt.avatarsL}
        M={spekt.avatarsM ? true : !(spekt.avatarsL || spekt.avatarsS)}
        S={spekt.avatarsS}
        curators={spekt.personsObj}
      />
      :
      <Img
        src={spekt?.cover?.file?.url}
        className="SpektCard__cover"
      />
    }
  </Link>


export default SpektCard