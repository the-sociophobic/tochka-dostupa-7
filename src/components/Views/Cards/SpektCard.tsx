import React from 'react'

import { format } from 'date-fns'

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
import FormattedMessage from '../../FormattedMessage'


interface Props extends Spekt {
  onClick?(e: any): void
  className?: string
  linkDisabled?: boolean
  avatarsL?: boolean
  avatarsM?: boolean
  avatarsS?: boolean
  style?: object
  outerRef?: any
}


const SpektCard: React.FunctionComponent<Props> = (spekt: Props) =>
  <Link
    outerRef={spekt.outerRef}
    // to={spekt.link}
    to={`/spekt/${spekt.link}`}
    className={`SpektCard ${spekt.className}`}
    disabled={spekt.linkDisabled}
    onClick={(e: any) => spekt.onClick?.(e)}
    style={spekt.style}
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
    {spekt.shortDesc &&
      <div className="SpektCard__short-desc">
        {spekt.shortDesc}
      </div>
    }
    {spekt?.personsObj &&
      <div className='p p--s mb-xxs'>
        {(() => {
          const date = new Date(spekt.ticketsAndSchedule?.tickets?.[0]?.tickets?.[0]?.datetime || '')

          return <>
            {format(date, 'dd.MM')} / <FormattedMessage id='Program.startAt' /> {format(date, 'HH:mm')}
          </>
        })()}
      </div>
    }

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
        src={`${spekt?.cover?.file?.url}?fit=fill&w=587&h=356`}
        className="SpektCard__cover"
      />
    }
  </Link>


export default SpektCard