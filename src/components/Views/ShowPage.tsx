import React from 'react'

import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import GoogleMapReact from 'google-map-react'

import { Context } from '../Store'
import {
  Program,
  Online,
  Offline,
  Age,
} from '../buttons'
import { MappedShow } from '../Store/Types'
import FormattedMessage from '../FormattedMessage'



type Props = {
  show: MappedShow
  back: Function
}

type State = {

}


const tickets = [
  {
    number: 2281488,
  },
  {
    number: 2281489,
  },
  {
    number: 2281490,
  },
  {
    number: 2281491,
  },
  {
    number: 2281492,
  },
  {
    number: 2281493,
  },
]


class ShowPage extends React.Component<Props, State> {

  static contextType = Context

  render = () => {
    if (!this?.context?.ready)
      return ''

    const page = this?.context?.contentful?.accountPages?.[0]
    const { show } = this.props

    return (
      <div className='ShowPage'>
        <div className='container'>
          <div className='row d-flex flex-column flex-lg-row'>
            <div className='col-4'>
              <div
                className='p p--l p--arrow p--arrow--left cursor-pointer mb-xs mb-s'
                onClick={() => this.props.back()}
              >
                <FormattedMessage id='Program.hideText' />
              </div>
            </div>


            <div className='col-4 col-md-6 col-lg-8 d-flex flex-column'>
              <div className='h2'>
                {show.name}
              </div>
              <div className='p p--xxxxl font-spectral mb-xxs'>
                {show.persons}
              </div>

              <div className='d-flex flex-row mb-xs mb-md-s'>
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

              <div className='p p--xxxl mb-xxs mb-md-xs'>
                {format(
                  show.dateObj,
                  'dd.MM / iiii / HH:mm ',
                  { locale: this.context.locale === 'rus' ? ru : enUS })}
              </div>

              <div className='row mb-m mb-md-m mb-lg-xl'>
                <div className='col-4 col-md-3 col-lg-6'>
                  <div className='h3'>
                    <FormattedMessage id='Spekt.length' />
                  </div>
                  <div className='p p--l'>
                    {show.length}
                  </div>
                </div>
                <div className='col-4 col-md-3 col-lg-6'>
                  <div className='h3'>
                    <FormattedMessage id='Spekt.stage' />
                  </div>
                  <div className='p p--l'>
                    {this.context.locale === 'rus' ? show.stage : show.stageEn}
                  </div>
                </div>
              </div>

              <div className='h3 mb-xs'>
                {page.myTickets}
              </div>
              <div className='row d-flex flex-row flex-wrap'>
                {tickets.map(ticket =>
                  <div className='col-4 col-md-3 col-lg-6 mb-xxs'>
                    <div className='ShowPage__ticket'>
                      <div className='h3 mb-xs mb-xl-m'>
                        {page.ticketNumber}{ticket.number}
                      </div>
                      {show.offline &&
                        <div
                          className='ShowPage__ticket__link'
                          onClick={() => {}}
                        >
                          {page.downloadPDF}
                        </div>}
                      <div
                        className='ShowPage__ticket__link'
                        onClick={() => {}}
                      >
                        {page.transferTicket}
                      </div>
                      <div
                        className='ShowPage__ticket__link'
                        onClick={() => {}}
                      >
                        {page.returnTicket}
                      </div>
                      {show.online &&
                        <div
                          className='button button-main w-50'
                          onClick={() => {}}
                        >
                          {page.start}
                        </div>
                      }
                    </div>
                  </div>
                )}
              </div>

              {show.online &&
                <div className='col pink-block py-xxs py-md-xs'>
                  <div className='row d-flex flex-row justify-content-center'>
                    <div className='col-4 col-md-4 col-lg-9'>
                      {page.buttonWillBeActive}
                    </div>
                  </div>
                </div>
              }

              {show.online &&
                <div className='col d-fle flex-column'>
                  <div className='h3 mt-m mt-md-m mt-lg-xl'>
                    {page.howToWatch}
                  </div>
                </div>
              }

              {show.offline &&
                <div className='col d-fle flex-column'>
                  <div className='h3 mt-m mt-md-m mt-lg-xl mb-xxs mb-md-xs'>
                    {page.howToGetHere}
                  </div>
                  <div className='ShowPage__map-container'>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "AIzaSyDtnk19nAsbs98Rx81bCzvkF5jyD0o7W4w" }}
                      center={{
                        lat: 59.925,
                        lng: 30.331
                      }}
                      zoom={12}
                      options={{
                      //   styles: style,
                        disableDefaultUI: true,
                      //   maxZoom: this.props.maxZoom,
                      //   minZoom: this.props.minZoom,
                      //   restriction: this.props.restriction,
                      }}
                      // onChange={e => this.setState({ center: e.center })}
                      // onZoomAnimationStart={zoom => this.setState({ zoom: zoom })}

                      yesIWantToUseGoogleMapApiInternals
                      // onGoogleApiLoaded={() => this.context.setMapLoaded()}
                      // onTilesLoaded={() => this.context.setMapLoaded()}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ShowPage