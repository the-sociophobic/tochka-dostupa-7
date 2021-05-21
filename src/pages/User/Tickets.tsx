import React from 'react'

import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import isBefore from 'date-fns/isBefore'
import startOfToday from 'date-fns/startOfToday'

import { Context } from '../../components/Store'
import { getRandomValues } from '../../utils/getRandom'
import { MappedShow } from '../../components/Store/Types'
import {
  Program,
  Online,
  Offline,
  Age,
} from '../../components/buttons'


type Props = RouteComponentProps<{
  param1: string,
}>

type State = {
  currentEvent: string
}


class Tickets extends React.Component<Props, State> {

  state: State = {
    currentEvent: ''
  }
  
  static contextType = Context

  renderEvent = (event: MappedShow, past: boolean, page: any) =>
    <div className='col-4 col-md-3 col-lg-4 mb-xxs'>
      <div className={`Tickets__event ${past && 'Tickets__event--past'}`}>
        <div className='d-flex flex-row justify-content-between'>
          <div className='p p--l'>
            {format(
              event.dateObj,
              'dd.MM / HH:mm ',
              { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>
          <div className='p p--xl font-spectral'>
            2 билета
          </div>
        </div>
        <div className='Tickets__event__delimeter' />
        <div className='Tickets__event__name'>
          {event.name}
        </div>
        <div className='Tickets__event__persons'>
          {event.persons}
        </div>
        <div className='p p--s mb-xxs'>
          {event.shortDesc}
        </div>
        <div className='d-flex flex-row mt-auto mb-xxs'>
          <Program
            text={event.program?.name}
            className='mr-2 mb-2'
          />
          {event.offline &&
            <Offline
              className='mr-2 mb-2'
            />}
          {event.online &&
            <Online
              className='mr-2 mb-2'
            />}
          {event.age &&
            <Age
              text={event.age}
              className='mr-2 mb-2'
            />}
        </div>
        {past ?
          <div className='p p--s'>
            {page.eventIsOver}
          </div>
          :
          <div
            className='cursor-pointer p p--s p--arrow p--arrow--right'
            onClick={() => this.setState({ currentEvent: event.id })}
          >
            {page.details}
          </div>
        }
      </div>
    </div>


  render = () => {
    if (!this?.context?.ready || !this?.context?.contentful?.mappedDays)
      return ''

    if (_.isEmpty(this.context.user))
      this.props.history.push('/login')

    const page = this?.context?.contentful?.accountPages?.[0]
    const { mappedDays } = this?.context?.contentful

    const events = [
      ...getRandomValues(this?.context?.contentful?.mappedDays, 6),
      mappedDays?.[Object.keys(mappedDays)[Object.keys(mappedDays).length - 1]]
    ]
      .map((day: MappedShow[]) => day[0])

    return (
      <div className="Tickets">
        <div className="container">
          <div className='row mb-s mb-lg-xl'>
            <div className='col'>
              <div className='h1'>
                {page.myEvents}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='h3 h3--underline'>
                {page.upcoming}
              </div>
            </div>
          </div>
          <div className='row d-flex flex-column flex-md-row flex-wrap align-items-stretch'>
            {events
              .filter((event: MappedShow) =>
                !isBefore(event.dateObj, startOfToday()))
              .map((event: MappedShow) =>
                this.renderEvent(event, false, page))}
          </div>

          <div className='row mt-m mt-lg-l'>
            <div className='col'>
              <div className='h3 h3--underline'>
                {page.past}
              </div>
            </div>
          </div>
          <div className='row d-flex flex-column flex-md-row flex-wrap align-items-stretch'>
            {events
              .filter((event: MappedShow) =>
                isBefore(event.dateObj, startOfToday()))
              .map((event: MappedShow) =>
                this.renderEvent(event, true, page))}
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Tickets)