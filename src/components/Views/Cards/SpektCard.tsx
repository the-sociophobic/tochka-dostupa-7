import React from 'react'

import Link from '../../Link'
import Img from '../../Img'
import {
  Online,
  Offline,
  Age,
} from '../../buttons'
import { Spekt } from '../../Store/Types'
import FormattedMessage from '../../FormattedMessage'


interface Props extends Spekt {
  onClick?(): void
  className?: string
  linkDisabled?: boolean
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
      {/* <FormattedMessage message={spekt.name} /> */}
      {spekt.name}
    </div>
    <div className="SpektCard__makers">
      {/* {spekt?.persons?.length > 0 && spekt.persons.map(maker => */}
      {spekt?.persons?.split(', ').map(maker =>
        <div
          className="SpektCard__makers__item"
        >
          {/* <FormattedMessage message={maker.name} />&nbsp;<FormattedMessage message={maker.surname} /> */}
          {maker}
        </div>
      )
      .reduce((a, b) => <>{a}, {b}</>)}
    </div>
    <div className="SpektCard__short-desc">
      {/* <FormattedMessage message={spekt.shortDesc} /> */}
      {spekt.shortDesc}
    </div>

    <div className="SpektCard__buttons">
      {spekt.offline && <Offline />}
      {spekt.online && <Online />}
      {spekt.age && <Age text={spekt.age} />}
    </div>

    <Img
      src={spekt?.cover?.file?.url}
      className="SpektCard__cover"
    />
  </Link>


export default SpektCard