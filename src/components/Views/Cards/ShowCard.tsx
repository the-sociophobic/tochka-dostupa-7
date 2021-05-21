import React from 'react'

import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'

import {
  Program,
  Online,
  Offline,
  Age,
} from '../../buttons'
import { MappedShow } from '../../Store/Types'



type Props = {
  show: MappedShow
  past: boolean
  page: any
  openShow: Function
  locale: string
}


const ShowCard: React.FunctionComponent<Props> = ({
  show,
  past,
  page,
  openShow,
  locale
}) =>
  <div className='col-4 col-md-3 col-lg-4 mb-xxs'>
    <div className={`Tickets__show ${past && 'Tickets__show--past'}`}>
      <div className='d-flex flex-row justify-content-between'>
        <div className='p p--l'>
          {format(
            show.dateObj,
            'dd.MM / HH:mm ',
            { locale: locale === 'rus' ? ru : enUS })}
        </div>
        <div className='p p--xl font-spectral'>
          2 билета
        </div>
      </div>
      <div className='Tickets__show__delimeter' />
      <div className='Tickets__show__name'>
        {show.name}
      </div>
      <div className='Tickets__show__persons'>
        {show.persons}
      </div>
      <div className='p p--s mb-xxs'>
        {show.shortDesc}
      </div>
      <div className='d-flex flex-row mt-auto mb-xxs'>
        <Program
          text={show.program?.name}
          className='mr-2 mb-2'
        />
        {show.offline &&
          <Offline
            className='mr-2 mb-2'
          />}
        {show.online &&
          <Online
            className='mr-2 mb-2'
          />}
        {show.age &&
          <Age
            text={show.age}
            className='mr-2 mb-2'
          />}
      </div>
      {past ?
        <div className='p p--s'>
          {page.showIsOver}
        </div>
        :
        <div
          className='cursor-pointer p p--s p--arrow p--arrow--right'
          onClick={() => openShow()}
        >
          {page.details}
        </div>
      }
    </div>
  </div>


export default ShowCard