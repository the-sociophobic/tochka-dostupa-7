import React from 'react'

import _ from 'lodash'
import { Location } from '@reach/router'
import { navigate } from 'gatsby'
import isBefore from 'date-fns/isBefore'
import startOfToday from 'date-fns/startOfToday'

import { Context } from '../../components/Store'
import { getRandomValues } from '../../utils/getRandom'
import { MappedShow } from '../../components/Store/Types'
import ShowCard from '../../components/Views/Cards/ShowCard'
import ShowPage from '../../components/Views/ShowPage'


type Props = {
  location: any
}

type State = {
  currentShow: MappedShow | undefined
}


class Tickets extends React.Component<Props, State> {

  state: State = {
    currentShow: undefined
  }
  
  static contextType = Context

  // shows: MappedShow[] = []

  // componentDidMount = () =>
  //   this?.context?.registerInitializeCallback(() => {
  //     const { mappedDays } = this?.context?.contentful

  //     this.shows = [
  //       ...getRandomValues(this?.context?.contentful?.mappedDays, 6),
  //       mappedDays?.[Object.keys(mappedDays)[Object.keys(mappedDays).length - 1]]
  //     ]
  //       .map((day: MappedShow[]) => day[0])

  //     this.setState({ currentShow: this.shows[this.shows.length - 1]})
  //   })

  render = () => {
    if (!this?.context?.ready || !this?.context?.contentful?.mappedDays)
      return ''

    if (_.isEmpty(this.context.user))
      navigate('/login')

    const page = this?.context?.contentful?.accountPages?.[0]
    const { mappedDays } = this?.context?.contentful
    const shows = [
      ...getRandomValues(this?.context?.contentful?.mappedDays, 6),
      mappedDays?.[Object.keys(mappedDays)[Object.keys(mappedDays).length - 1]]
    ]
      .map((day: MappedShow[]) => day[0])

    return typeof this.state.currentShow !== 'undefined' ?
      <ShowPage
        show={this.state.currentShow}
        back={() => this.setState({ currentShow: undefined })}
      />
      :
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
            {shows
              .filter((show: MappedShow) =>
                !isBefore(show.dateObj, startOfToday()))
              .map((show: MappedShow) =>
                <ShowCard
                  show={show}
                  past={false}
                  page={page}
                  openShow={() => this.setState({ currentShow: show })}
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
            {shows
              .filter((show: MappedShow) =>
                isBefore(show.dateObj, startOfToday()))
              .map((show: MappedShow) =>
                <ShowCard
                  show={show}
                  past={true}
                  page={page}
                  openShow={() => this.setState({ currentShow: show })}
                  locale={this.context.locale}
                />
            )}
          </div>
        </div>
      </div>
  }
}


const TicketsWithLocation = () =>
  <Location>
    {({location}) =>
      <Tickets location={location} />
    }
  </Location>


export default TicketsWithLocation