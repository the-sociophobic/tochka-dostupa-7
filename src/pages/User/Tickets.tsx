import React from 'react'

import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import isBefore from 'date-fns/isBefore'
import startOfToday from 'date-fns/startOfToday'

import { Context } from '../../components/Store'
import { getRandomValues } from '../../utils/getRandom'
import { MappedShow } from '../../components/Store/Types'
import ShowCard from '../../components/Views/Cards/ShowCard'


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
                <ShowCard
                  show={event}
                  past={false}
                  page={page}
                  setEvent={() => this.setState({ currentEvent: event.id })}
                  locale={this.context.locale}
                />
            )}
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
                <ShowCard
                  show={event}
                  past={true}
                  page={page}
                  setEvent={() => this.setState({ currentEvent: event.id })}
                  locale={this.context.locale}
                />
            )}
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Tickets)