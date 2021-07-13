import React from 'react'

import capitalize from 'capitalize'
import { format } from 'date-fns'
import isBefore from 'date-fns/isBefore'
import endOfYesterday from 'date-fns/endOfYesterday'
import isWithinInterval from 'date-fns/isWithinInterval'
import { ru, enUS } from 'date-fns/locale'
import { savePDF } from '@progress/kendo-react-pdf'
import _ from 'lodash'

import FormattedMessage from '../components/FormattedMessage'
import {
  Online,
  Offline,
  Program,
  Age
} from '../components/buttons'
import { Context } from '../components/Store'
import {
  MappedShow,
  Days
} from '../components/Store/Types'
import { getMessage } from '../components/Store/locale'
import RangePicker from '../components/RangePicker'
import Link from '../components/Link'
import camelize from '../utils/camelize'
import radarioProps from '../utils/radarioProps'
import { FestivalPassSchedule } from '../components/FestivalPass'
import isValidDate from '../utils/isValidDate'
// import Loader from '../components/Loader'


type FilterState = {
  main: boolean
  open: boolean
  educational: boolean
  online: boolean
  offline: boolean
  from: Date | undefined
  to: Date | undefined
  [key: string]: any
}
type State = FilterState & {
  showFilter: boolean
  showPrev: number
  renderingPDF: boolean
}


const filterInitialState: FilterState = {
  main: false,
  open: false,
  educational: false,
  online: false,
  offline: false,
  from: undefined,
  to: undefined,
}
const loadAdditionalNumber = 5
const currentFestivalFirstDay = '2021-01-01'


class Schedule extends React.Component<{}, State> {
  
  state: State = {
    ...filterInitialState,
    showFilter: false,
    showPrev: 0,
    renderingPDF: false
  }

  static contextType = Context

  pdfRef: any = React.createRef()

  toggleAttrib = (attrib: string) =>
    this.setState({ [attrib]: !this.state[attrib] })

  savePDF = () => {
    this.setState({ renderingPDF: true })
    // this.context.setState({ ready: false })

    const { from, to } = this.state
    const datesSet = from && to
    const datesRange = datesSet ? `${from} - ${to}` : `${currentFestivalFirstDay} - 2021.07.26`

    setTimeout(() =>
      savePDF(
        this.pdfRef.current,
        {
          paperSize:  "A4",
          fileName: `${getMessage(this, 'Schedule.pdfFileName')} ${datesRange}.pdf`
        },
        () => {
          this.setState({ renderingPDF: false })
          // this.context.setState({ ready: true })
        }
      )
    , 200)
  }

  renderFilter = (className?: string) =>
    <div className={`Schedule__filter ${className}`}>
      <FormattedMessage
        id='Schedule.filter'
        className='h3 mb-3 mb-lg-s'
      />

      <div className='Schedule__filter__p'>
        {camelize(getMessage(this, 'Program.name'))}
      </div>
      <div className='w-100 d-flex flex-row flex-wrap mb-3 mb-lg-s'>
        {['main', 'open', 'educational']
          .map(program =>
            <Program
              key={program}
              text={getMessage(this, `Program.pages.${capitalize(program)}.name`)}
              className={`Schedule__filter__button ${!this.state[program] && 'button--selectable'}`}
              onClick={() => this.toggleAttrib(program)}
            />
        )}
      </div>

      <FormattedMessage
        id='Schedule.eventType'
        className='Schedule__filter__p'
      />
      <div className='w-100 d-flex flex-row flex-wrap mb-3 mb-lg-s'>
        <Online
          className={`Schedule__filter__button ${!this.state.online && 'button--selectable'}`}
          onClick={() => this.toggleAttrib('online')}
        />
        <Offline
          className={`Schedule__filter__button ${!this.state.offline && 'button--selectable'}`}
          onClick={() => this.toggleAttrib('offline')}
        />
      </div>

      <FormattedMessage
        id='Schedule.dates'
        className='Schedule__filter__p'
      />
      <RangePicker
        locale={this.context.locale}
        dateA={this.state.from}
        dateB={this.state.to}
        setDateA={(value: Date | undefined) =>
          this.setState({ from: value })}
        setDateB={(value: Date | undefined) =>
          this.setState({ to: value })}
      />

      <div
        onClick={this.savePDF}
        className='p p--l p--arrow p--arrow--down mb-1 cursor-pointer'
      >
        <FormattedMessage id='Schedule.download' />
      </div>
      <div className='p p--s mb-xxs mb-lg-xs color-button-disabled-text'>
        <FormattedMessage id='Schedule.downloadDesc' />
      </div>

      {!Object.keys(filterInitialState)
        .every(key => filterInitialState[key] === this.state[key])
          &&
            <div
              className='p p--l color-danger p--cross cursor-pointer'
              onClick={() => this.setState(filterInitialState)}
            >
              <FormattedMessage id='Schedule.cleanFilter' />
            </div>
      }

    </div>

  getFilteredDaysAndIndex = () => {
    let indexOfCurrentFestivalFirstDay = -1

    Object.keys(this.context?.contentful?.mappedDays)
      .forEach((dayKey, index) =>
        (dayKey.localeCompare(currentFestivalFirstDay) === 1 && indexOfCurrentFestivalFirstDay === -1)
          && (indexOfCurrentFestivalFirstDay = index))
  
    let filteredDays: Days = Object.keys(this.context?.contentful?.mappedDays)
      .slice(
        Math.max(0,
          indexOfCurrentFestivalFirstDay === -1 || (this.state.from && this.state.to) ?
            0
            :
            indexOfCurrentFestivalFirstDay - this.state.showPrev * loadAdditionalNumber))
      .map((dayKey: string): Days =>
        ({ [dayKey]: 
          (this.context?.contentful?.mappedDays[dayKey] || [])
            .filter((show: MappedShow) =>
              (!this.state.online && !this.state.offline) || (
                (this.state.online && show.online)
                || (this.state.offline && show.offline)
              )
            )
            .filter((show: MappedShow) =>
              (!this.state.main && !this.state.open && !this.state.educational) || (
                (this.state.main && show?.program?.id === '7fOwCkT7nOXh3C81toLoSs')
                || (this.state.open && show?.program?.id === '4qgsLo90by1TfShZwdyNhw')
                || (this.state.educational && show?.program?.id === '6OfzgvjCzzT1xhlwDH2AfQ')
              )
            )
            .filter((show: MappedShow) => {
              const fromDate = this.state.from
              const toDate = this.state.to

              if (!fromDate || !toDate || !isValidDate(fromDate) || !isValidDate(toDate))
                return true

              return isWithinInterval(
                show.dateObj,
                { start: fromDate, end: toDate })
            })
        })
      )
      .filter((day: Days) => (day[Object.keys(day)[0]]?.length || 0) > 0)
      .reduce((a, b) => ({...a, ...b}), {})

    return ({
      indexOfCurrentFestivalFirstDay: indexOfCurrentFestivalFirstDay,
      filteredDays: filteredDays
    })
  }

  renderDays = () => {
    const { filteredDays, indexOfCurrentFestivalFirstDay } = this.getFilteredDaysAndIndex()

    return (
      <div className='col-4 col-md-6 col-lg-8'>
        {indexOfCurrentFestivalFirstDay - this.state.showPrev * loadAdditionalNumber > 0
          && (typeof this.state.from === 'undefined' || typeof this.state.to === 'undefined') &&
            <div
              className='Schedule__load-prev'
              onClick={() => this.setState({ showPrev: this.state.showPrev + 1 })}
            >
              <FormattedMessage id='Schedule.loadPrev' />
            </div>
        }
        <FestivalPassSchedule />
        {_.isEmpty(filteredDays) ?
          <div className='text-center my-m p p--xl'>
            <FormattedMessage id='Schedule.nothing' />
          </div>
          :
          Object.keys(filteredDays)
            .map((dayKey: string) =>
              <div
                key={dayKey}
                className='Schedule__day'
              >
                <h2 className='h2 h2--underline pb-1 pb-md-2 mb-3'>
                  {format(
                    new Date(dayKey),
                    `d MMMM / ${dayKey?.includes('2021') ? 'EEEE' : ' yyyy'}`,
                    { locale: this.context.locale === 'rus' ? ru : enUS }
                  )}
                </h2>
                {filteredDays[dayKey]
                  ?.sort((a: MappedShow, b: MappedShow) => a.datetime.localeCompare(b.datetime))
                  ?.map((show: MappedShow, index: number) =>
                    <div
                      key={index}
                      className='Schedule__day__show'
                    >
                      <div className='col-4 col-md-1 col-lg-3'>
                        <p className='p p--l'>
                          {this.context.locale === 'rus' ?
                            show.scheduleCust
                            ||
                            <>{format(show.dateObj, 'HH:mm')} <FormattedMessage id='Schedule.msk' /></>
                            :
                            show.scheduleCustEn
                            ||
                            <>{format(show.dateObj, 'HH:mm')} <FormattedMessage id='Schedule.msk' /></>
                          }
                        </p>
                      </div>
                      <Link
                        to={show.link?.includes?.('http') ? show.link : `spekt/${show.link}`}
                        disabled={this.context.locale === 'eng' || typeof show.link === 'undefined'}
                        className='Schedule__day__show__info'
                      >
                        <h3 className='h3 mb-0'>
                          {show.name}
                        </h3>
                        <p className='p p--xl mb-xs font-spectral'>
                          {show.persons}
                        </p>
                        {(this.context.locale === 'rus' && show.disclaimer) &&
                          <p className='p p--s'>
                            {show.disclaimer}
                          </p>
                        }
                        {(this.context.locale === 'eng' && show.disclaimerEn) &&
                          <p className='p p--s'>
                            {show.disclaimerEn}
                          </p>
                        }
                        <div className='w-100 d-flex flex-row flex-wrap mb-xs mb-md-0'>
                          {show.program &&
                            <Program
                              text={show.program.name}
                              className='mr-2 mb-2'
                            />}
                          {show.offline &&
                            <Offline className='mr-2 mb-2' />}
                          {show.online &&
                            <Online className='mr-2 mb-2' />}
                          {show.age &&
                            <Age
                              text={show.age}
                              className='mr-2 mb-2'
                            />}
                        </div>
                      </Link>
                      <div className='col-4 col-md-2 col-lg-3'>
                        <Link
                          disabled={
                            isBefore(show.dateObj, endOfYesterday())
                              && !((show.scheduleCust?.includes('с ') || show.scheduleCust?.includes('Доступен всегда')) && !show.scheduleCust?.includes('мск'))}
                          className='Schedule__day__show__button'
                          {...radarioProps(show)}
                        >
                          {this.context.locale === 'rus' ?
                            show.buttonNameCust || <FormattedMessage id='Schedule.buy' />
                            :
                            show.buttonNameCustEn || <FormattedMessage id='Schedule.buy' />
                          }
                        </Link>
                      </div>
                    </div>)
                }
              </div>
            )
        }
      </div>
    )
  }

  renderPDF = () => {
    const { filteredDays } = this.getFilteredDaysAndIndex()

    return (
      <>
        <div style={{
          position: 'fixed',
          zIndex: 5000,
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          backgroundColor: 'white'
        }}>
          loading...
        </div>
        <div
          ref={this.pdfRef}
          className='container'
        >
          {_.isEmpty(filteredDays) ?
            <div className='row'>
              <div className='col'>
                <div className='text-center my-m p p--m'>
                  <FormattedMessage id='Schedule.nothing' />
                </div>
              </div>
            </div>
            :
            Object.keys(filteredDays)
              .map((dayKey: string) =>
                <div
                  key={dayKey}
                  className='row'
                  style={{
                    transform: 'scale(.9)'
                  }}
                >
                  <div className='col d-flex flex-column'>
                    <h2 className='p p--s p--underline font-weight-bold pb-1 pb-md-2 mb-3'>
                      {format(
                        new Date(dayKey),
                        `d MMMM / ${dayKey?.includes('2021') ? 'EEEE' : ' yyyy'}`,
                        { locale: this.context.locale === 'rus' ? ru : enUS }
                      )}
                    </h2>
                    {filteredDays[dayKey]
                      ?.sort((a: MappedShow, b: MappedShow) => a.datetime.localeCompare(b.datetime))
                      ?.map((show: MappedShow, index: number) =>
                        <div
                          key={index}
                          className='row'
                        >
                          <div className='col-3'>
                            <p className='p p--xxs'>
                              {this.context.locale === 'rus' ?
                                show.scheduleCust
                                ||
                                <>{format(show.dateObj, 'HH:mm')} <FormattedMessage id='Schedule.msk' /></>
                                :
                                show.scheduleCustEn
                                ||
                                <>{format(show.dateObj, 'HH:mm')} <FormattedMessage id='Schedule.msk' /></>
                              }
                            </p>
                          </div>
                          <Link
                            to={show.link?.includes?.('http') ? show.link : `spekt/${show.link}`}
                            disabled={this.context.locale === 'eng' || typeof show.link === 'undefined'}
                            className='col-9 d-flex flex-column'
                          >
                            <h3 className='p p--xs font-weight-bold mb-0'>
                              {show.name}
                            </h3>
                            <p className={`p p--xs mb-1`}>
                              {show.persons}
                            </p>
                            <div
                              className='w-100 d-flex flex-row flex-wrap mb-xs mb-md-0'
                              style={{
                                transform: 'scale(.75)'
                              }}
                            >
                              {show.program &&
                                <Program
                                  text={show.program.name}
                                  className='mr-2 mb-3'
                                />}
                              {show.offline &&
                                <Offline className='mr-2 mb-3' />}
                              {show.online &&
                                <Online className='mr-2 mb-3' />}
                              {show.age &&
                                <Age
                                  text={show.age}
                                  className='mr-2 mb-3'
                                />}
                            </div>
                          </Link>
                        </div>
                      )
                    }
                  </div>
                </div>
          )}
        </div>
      </>
    )
  }

  render = () =>
    !this?.context?.ready ?
      ''
      :
      this.state.renderingPDF ?
        this.renderPDF()
        :
        <div className="container mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl">
          <div className='row d-flex d-lg-none mb-xs mb-md-s position-relative'>
            <div className='col-4'>
              <FormattedMessage
                id='Schedule.name'
                className='h1 mb-s mb-md-m mb-lg-xl d-block'
              />
            </div>
            <div className='col-4 col-md-2 position-static'>
              <button
                className={`button pt-1 w-100 ${this.state.showFilter ? 'button--main' : 'button--secondary'}`}
                onClick={() => this.toggleAttrib('showFilter')}
              >
                <FormattedMessage
                  id={this.state.showFilter ? 'Schedule.apply' : 'Schedule.filter'}
                />
              </button>
              {this.state.showFilter &&
                <div
                  className='position-absolute container d-block d-lg-none'
                  style={{
                    width: '100vw',
                    left: 0,
                    top: '110%',
                    zIndex: 1000,
                  }}
                >
                  <div className='row d-flex flex-row justify-content-end'>
                    <div className='col-4'>
                      <div className='Schedule__mobile-filter-container'>
                        {this.renderFilter()}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='row'>
            <div className='col-4 col-md-6 col-lg-4 d-none d-lg-flex flex-column'>
              <FormattedMessage
                id='Schedule.name'
                className='h1 mb-s mb-md-m mb-lg-xl'
              />
              {this.renderFilter()}
            </div>

            {this.renderDays()}

          </div>
        </div>
}


export default Schedule