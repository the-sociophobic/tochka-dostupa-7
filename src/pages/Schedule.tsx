import React from 'react'

import capitalize from 'capitalize'
import { format } from 'date-fns'
import isWithinInterval from 'date-fns/isWithinInterval'
import compareAsc from 'date-fns/compareAsc'
import { ru, enUS } from 'date-fns/locale'

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


type State = {
  main: boolean
  open: boolean
  educational: boolean
  online: boolean
  offline: boolean
  from: string
  to: string
  showFilter: boolean
  [key: string]: any
  loadPrev: boolean
}

interface MappedShow extends Show {
  name: string
  persons: string
  dateObj: any
  program: ProgramType | undefined
  online?: boolean | undefined
  offline?: boolean | undefined
  age?: string | number
}


class Schedule extends React.Component<{}, State> {
  
  state: State = {
    main: false,
    open: false,
    educational: false,
    online: false,
    offline: false,
    from: '',
    to: '',
    showFilter: false,
    loadPrev: false,
  }

  static contextType = Context

  toggleAttrib = (attrib: string) =>
    this.setState({ [attrib]: !this.state[attrib] })

  renderFilter = (className?: string) =>
    <div className={`Schedule__filter ${className}`}>
      <FormattedMessage
        id='Schedule.filter'
        className='h3 mb-3 mb-lg-s'
      />

      <FormattedMessage
        id='Program.name'
        className='Schedule__filter__p'
      />
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
                program: spekt.program,
                offline: show.offline || !show.online
              })))
          .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
            [...(a || []), ...(b || [])])
      )
      .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
        [...(a || []), ...(b || [])])
      .filter((show: MappedShow) =>
        this.state.loadPrev ||
          compareAsc(show.dateObj, new Date('05-05-2021')) > 0
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
        
    return Object.keys(days)
      .sort((a: string, b: string) => a.localeCompare(b))
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
                <div className='col-4 col-md-3 col-lg-6 d-flex flex-column'>
                  <h3 className='h3 mb-0'>
                    {show.name}
                  </h3>
                  <p className='p p--xl font-spectral mb-xs'>
                    {show.persons}
                  </p>
                  <div className='w-100 d-flex flex-row flex-wrap'>
                    {show.program &&
                      <Program
                        text={show.program.name}
                        className='mr-1'
                      />}
                    {show.offline &&
                      <Offline className='mr-1' />}
                    {show.online &&
                      <Online className='mr-1' />}
                    {show.age &&
                      <Age
                        text={show.age}
                        className='mr-1'
                      />}
                  </div>
                </div>
                <div className='col-4 col-md-2 col-lg-3'>
                  <button
                    className='Schedule__day__show__button'
                    // onClick
                  >
                    <FormattedMessage id={show.online ? 'Schedule.register' : 'Schedule.buy'} />
                  </button>
                </div>
              </div>)
          }
        </div>
      )
  }

  render = () =>
    <div className="container mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl">
      <div className='row d-flex d-lg-none mb-xs mb-md-s position-relative'>
        <div className='col-4'>
          <FormattedMessage
            id='Schedule.name'
            className='h1 mb-s mb-md-m mb-lg-xl'
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
                  top: '56px',
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
        <div className='col-4 col-md-6 col-lg-8'>
          {!this.state.loadPrev &&
            <div
              className='Schedule__load-prev'
              onClick={() => this.setState({ loadPrev: true })}
            >
              <FormattedMessage id='Schedule.loadPrev' />
            </div>}
          {this.renderDays()}
        </div>
      </div>
    </div>
}


export default Schedule