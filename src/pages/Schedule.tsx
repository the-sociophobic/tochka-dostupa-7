import React from 'react'

import capitalize from 'capitalize'
import { format } from 'date-fns'
import isBefore from 'date-fns/isBefore'
import endOfToday from 'date-fns/endOfToday'
import isWithinInterval from 'date-fns/isWithinInterval'
import { ru, enUS, ca } from 'date-fns/locale'
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


import FormattedMessage from '../components/FormattedMessage'
import {
  Online,
  Offline,
  Program,
  Age
} from '../components/buttons'
import { Context } from '../components/Store'
import {
  Spekt,
  Place,
  Show,
  Program as ProgramType,
} from '../components/Store/Types'
import { getMessage } from '../components/Store/locale'
import DatePicker from '../components/DatePicker'
import Link from '../components/Link'
import camelize from '../utils/camelize'


type FilterState = {
  main: boolean
  open: boolean
  educational: boolean
  online: boolean
  offline: boolean
  from: string
  to: string
  [key: string]: any
}
type State = FilterState & {
  showFilter: boolean
  showPrev: number
}

interface MappedShow extends Show {
  name: string
  persons: string
  dateObj: any
  datetime: string
  program: ProgramType | undefined
  online?: boolean | undefined
  offline?: boolean | undefined
  age?: string | number
}

const filterInitialState: FilterState = {
  main: false,
  open: false,
  educational: false,
  online: false,
  offline: false,
  from: '',
  to: '',
}
const loadAdditionalNumber = 10


class Schedule extends React.Component<{}, State> {
  
  state: State = {
    ...filterInitialState,
    showFilter: false,
    showPrev: 0,
  }

  static contextType = Context

  pdfRef: any = React.createRef()

  toggleAttrib = (attrib: string) =>
    this.setState({ [attrib]: !this.state[attrib] })

  savePDF = () => {
    
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
      <DatePicker
        dateA={this.state.from}
        dateB={this.state.to}
        setDateA={(value: string) => this.setState({ from: value })}
        setDateB={(value: string) => this.setState({ to: value })}
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

  renderDays = () => {
    let days: {[key: string]: MappedShow[] | undefined} = {}
    
    this.context?.contentful?.spekts
      .map((spekt: Spekt): MappedShow[] | undefined =>
        spekt?.ticketsAndSchedule?.tickets
          .map((place: Place): MappedShow[] | undefined =>
            place?.tickets
              .map((show: Show): MappedShow => ({
                ...show,
                name: spekt.name,
                persons: spekt.persons,
                dateObj: new Date(show.datetime),
                datetime: show.datetime,
                program: spekt.program,
                offline: show.offline || !show.online,
                link: spekt.link,
                age: spekt.age,
              })))
          .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
            [...(a || []), ...(b || [])])
      )
      .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
        [...(a || []), ...(b || [])])
      .filter((show: MappedShow) =>
        show.datetime.length > 0
      )
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
        const fromDate = new Date(this.state.from)
        const toDate = new Date(this.state.to)

        if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime()))
          return true

        return isWithinInterval(
          show.dateObj,
          { start: fromDate, end: toDate })
      })
      .forEach((show: MappedShow) => {
        const day = show.datetime.split('T')[0]
        
        days.hasOwnProperty(day) ?
          days[day]?.push(show)
          :
          days[day] = [show]
      })
        
    days = Object.keys(days)
      .sort()
      .map((dayKey: string): {[key: string]: MappedShow[] | undefined} => ({[dayKey]: days[dayKey]}))
      ?.reduce((a, b) => ({...a, ...b}), {})
    
    let indexOfCurrentFestivalFirstDay = -1
    
    Object.keys(days)
      .forEach((dayKey, index) =>
        (dayKey.localeCompare('2020-05-05') === 1 && indexOfCurrentFestivalFirstDay === -1)
          && (indexOfCurrentFestivalFirstDay = index))

    return (
      <div className='col-4 col-md-6 col-lg-8'>
        {indexOfCurrentFestivalFirstDay - this.state.showPrev * loadAdditionalNumber > 0 &&
          <div
            className='Schedule__load-prev'
            onClick={() => this.setState({ showPrev: this.state.showPrev + 1 })}
          >
            <FormattedMessage id='Schedule.loadPrev' />
          </div>
        }
        {Object.keys(days)
          .slice(
            Math.max(0,
              indexOfCurrentFestivalFirstDay === -1 ?
                Object.keys(days).length
                :
                indexOfCurrentFestivalFirstDay - this.state.showPrev * loadAdditionalNumber))
          .map(dayKey =>
            <div className='Schedule__day'>
              <h2 className='h2 h2--underline pb-1 pb-md-2 mb-3'>
                {format(
                  new Date(dayKey),
                  `d MMMM / ${dayKey.includes('2021') ? 'EEEE' : ' yyyy'}`,
                  { locale: this.context.locale === 'rus' ? ru : enUS }
                )}
              </h2>
              {days[dayKey]
                ?.sort((a: MappedShow, b: MappedShow) => a.datetime.localeCompare(b.datetime))
                ?.map(show =>
                  <div className='Schedule__day__show'>
                    <div className='col-4 col-md-1 col-lg-3'>
                      <p className='p p--l'>
                        {format(show.dateObj, 'HH:mm')} <FormattedMessage id='Schedule.msk' />
                      </p>
                    </div>
                    <Link
                      to={`spekt/${show.link}`}
                      className='Schedule__day__show__info'
                    >
                      <h3 className='h3 mb-0'>
                        {show.name}
                      </h3>
                      <p className='p p--xl font-spectral mb-xs'>
                        {show.persons}
                      </p>
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
                      <button
                        className='Schedule__day__show__button'
                        // onClick
                        disabled={isBefore(show.dateObj, endOfToday())}
                      >
                        <FormattedMessage id={show.online ? 'Schedule.register' : 'Schedule.buy'} />
                      </button>
                    </div>
                  </div>)
              }
            </div>
          )
        }
      </div>
    )
  }

  render = () =>
    !this.context?.contentful ? '' :
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