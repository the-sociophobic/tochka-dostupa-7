import React from 'react'

import Link from '../../Link'
import Img from '../../Img'
import {
  Online,
  Offline,
  Age,
} from '../../buttons'
import { Play } from '../../Store/Types'
import FormattedMessage from '../../FormattedMessage'


interface Props extends Play {
  onClick?(): void
  className?: string
  linkDisabled?: boolean
}


const PlayCard: React.FunctionComponent<Props> = (play: Props) =>
  <Link
    to={play.link}
    className={`PlayCard ${play.className}`}
    disabled={play.linkDisabled}
    onClick={() => play.onClick?.()}
  >
    <div className="PlayCard__name">
      <FormattedMessage message={play.name} />
    </div>
    <div className="PlayCard__makers">
      {play.persons.length > 0 && play.persons.map(maker =>
        <div
          className="PlayCard__makers__item"
        >
          <FormattedMessage message={maker.name} />&nbsp;<FormattedMessage message={maker.surname} />
        </div>
      )
      .reduce((a, b) => <>{a}, {b}</>)}
    </div>
    <div className="PlayCard__short-desc">
      <FormattedMessage message={play.shortDesc} />
    </div>

    <div className="PlayCard__buttons">
      {play.offline && <Offline />}
      {play.online && <Online />}
      {play.age && <Age number={play.age} />}
    </div>

    <Img
      src={play.cover}
      className="PlayCard__cover"
    />
  </Link>


export default PlayCard