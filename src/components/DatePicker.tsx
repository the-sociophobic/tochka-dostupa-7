import React from 'react'

import { format } from 'date-fns'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import setDate from 'date-fns/setDate'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import isToday from 'date-fns/isToday'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import compareAsc from 'date-fns/compareAsc'
import { ru, enUS } from 'date-fns/locale'

import FormattedMessage from './FormattedMessage'
import { Context } from './Store'


type Props = {
  dateA: string
  dateB: string
  setDateA: (newDateA: string) => void
  setDateB: (newDateB: string) => void
  [key: string]: any
}

type State = {
  opened: boolean
  current: string
  stringA: string
  stringB: string
  currentFocused: string | undefined
  [key: string]: any
}


class DatePicker extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      opened: false,
      current: 'day',
      stringA: '',
      stringB: '',
      currentFocused: undefined
    }

    this.inputARef = React.createRef()
    this.inputBRef = React.createRef()
    this.calendarRef = React.createRef()
  }

  static contextType = Context

  inputARef: any
  inputBRef: any
  calendarRef: any
  [key: string]: any

  componentDidMount = () =>
    window.addEventListener('click', this.handleClick)
  componentWillUnmount = () =>
    window.removeEventListener('click', this.handleClick)

  handleClick = (e: any) =>
    e.target === this.inputARef.current ?
      this.setState({ currentFocused: 'A' })
      :
      e.target === this.inputBRef.current ?
        this.setState({ currentFocused: 'B' })
        :
        !(this.calendarRef?.current === e.target || this.calendarRef?.current?.contains(e.target))
          && this.setState({
            opened: false,
            currentFocused: undefined
          })
        
  setStateAndPropsDate = (dateId: string | undefined, value: string) => {
    if (!dateId)
      return

    if (!Number.isNaN((new Date(this.inputStringToDateReadableString(value))).getTime()))
      this.props[`setDate${dateId}`](this.inputStringToDateReadableString(value))
    this.setState({ [`string${dateId}`]: value })

    console.log('this.state.stringN:', this.state[`string${dateId}`])
  }

  inputStringToWrittenDateString = (string: string) => {
    console.log('inputStringToWrittenDateString:', string)

    return string.length === 8 ?
      `${string.slice(0, 2)}.${string.slice(2, 4)}.${string.slice(4)}`
      :
      ''
  }

  inputStringToDateReadableString = (string: string) =>
    string.length === 8 ?
      `${string.slice(2, 4)}-${string.slice(0, 2)}-${string.slice(4).length === 2 ? `20${string.slice(4)}` : string.slice(4)}`
      : 'error'

  propsDateToInputString = (propsDate: string) => {
    if (propsDate === '')
      return ''

    const dateObj = new Date(propsDate)

    return format(dateObj, 'ddMMyyyy')
  }

  renderInput = (dateId: string): JSX.Element =>
    <input
      ref={this[`input${dateId}Ref`]}
      className={`
        DatePicker__inputs__item
        ${this.state.currentFocused === dateId
          && 'DatePicker__inputs__item--focused'}`}
      onChange={e => {
        const value = (e.target as unknown as HTMLTextAreaElement).value
          .replace(/!(0-9)/g, '')

        this.setStateAndPropsDate(dateId, value)
      }}
      value={this.inputStringToWrittenDateString(this.state[`string${dateId}`])}
      onFocus={() => this.setState({
        currentFocused: dateId,
        opened: true
      })}
      onBlur={() =>
        this.inputStringToDateReadableString(this.state[`string${dateId}`]) !== this.props[`date${dateId}`] &&
          this.setState({
            [`string${dateId}`]: this.propsDateToInputString(this.props[`date${dateId}`])
          })
      }
    />

  renderCalendar = () => {
    if (!this.state.opened)
      return ''
      
    const selectedDate = new Date(this.props[`date${this.state.currentFocused}`])

    return (
      <div
        ref={this.calendarRef}
        className='DatePicker__calendar'
      >
        <div className='DatePicker__calendar__header'>
          <div
            className={`DatePicker__calendar__header__day
              ${this.state.current === 'day' && 'DatePicker__calendar__header__day--active'}`}
            onClick={() => this.setState({ current: 'day' })}
          >
            {Number.isNaN(selectedDate.getTime()) ?
              <FormattedMessage id='DatePicker.day' />
              :
              format(selectedDate, 'dd', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>
          <div
            className={`DatePicker__calendar__header__month
              ${this.state.current === 'month' && 'DatePicker__calendar__header__month--active'}`}
            onClick={() => this.setState({ current: 'month' })}
          >
            {Number.isNaN(selectedDate.getTime()) ?
              <FormattedMessage id='DatePicker.month' />
              :
              format(selectedDate, 'MMMM', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>
          <div
            className={`DatePicker__calendar__header__year
              ${this.state.current === 'year' && 'DatePicker__calendar__header__year--active'}`}
            onClick={() => this.setState({ current: 'year' })}
          >
            {Number.isNaN(selectedDate.getTime()) ?
              <FormattedMessage id='DatePicker.year' />
              :
              format(selectedDate, 'yyyy', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>
        </div>
        <div className='DatePicker__calendar__body'>
          {this.renderBody()}
        </div>
      </div>
    )
  }

  renderBody = () => {
    const selectedDateStringName = `date${this.state.currentFocused}`
    const selectedDateString = this.propsDateToInputString(this.props[selectedDateStringName])
    const currentMonthDayString = selectedDateString === '' ? format(new Date(), 'ddMMyyyy') : selectedDateString

    switch (this.state.current) {
      case 'day':
        const currentMonthDayStringParsed = this.inputStringToDateReadableString(currentMonthDayString)
        const currentMonthFirstDate = setDate(new Date(currentMonthDayStringParsed), 1)

        return eachWeekOfInterval({
            start: currentMonthFirstDate,
            end: addMonths(currentMonthFirstDate, 1)
          })
          .map((weekFirstDay: Date) =>
            Array.apply(null, Array(7)).map((value, index) => {
              const thisDay = addDays(weekFirstDay, index)
              const dateA = new Date(this.props.dateA)
              const dateB = new Date(this.props.dateB)
              const selectedDate = this.state.currentFocused === 'A' ? dateA : dateB
              const disabled = this.state.currentFocused === 'B'
                && !Number.isNaN(dateA.getTime())
                && compareAsc(dateA, thisDay) > 0

              return (
                <div
                  className={`
                    DatePicker__calendar__body__day
                    ${isSameDay(thisDay, selectedDate) && 'DatePicker__calendar__body__day--active'}
                    ${!isSameMonth(thisDay, currentMonthFirstDate)
                        && 'DatePicker__calendar__body__day--another-month'}
                    ${isToday(thisDay) && 'DatePicker__calendar__body__day--today'}
                    ${disabled && 'DatePicker__calendar__body__day--disabled'}
                  `}
                  onClick={() => {
                    if (disabled)
                      return

                    this.setStateAndPropsDate(
                      this.state.currentFocused,
                      format(thisDay, 'ddMMyyyy')
                    )
                    if (this.state.currentFocused === 'A') {
                      this.inputBRef?.current?.focus()
                      this.setState({ currentFocused: 'B' })
                    } else
                      this.setState({
                        currentFocused: undefined,
                        opened: false
                      })
                  }}
                >
                  {format(thisDay, 'd')}
                </div>
              )
            }
          ))
      case 'month':
        return Array.apply(null, Array(12)).map((value, index) =>
          <div
            className='DatePicker__calendar__body__month'
            onClick={() => {
              this.setStateAndPropsDate(
                this.state.currentFocused,
                currentMonthDayString.slice(0, 2) + (1 + index) + currentMonthDayString.slice(4)
              )
              this.setState({
                current: 'day',
              })
            }}
          >
            {format(new Date(`${1 + index}-01-2021`), 'MMM', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>)
      case 'year':
        return Array.apply(null, Array(12)).map((value, index) =>
          <div
            className='DatePicker__calendar__body__year'
            onClick={() => {
              this.setStateAndPropsDate(
                this.state.currentFocused,
                currentMonthDayString.slice(0, 4) + (2011 + index)
              )
              this.setState({
                current: 'day',
              })
            }}
          >
            {2011 + index}
          </div>)
    }
  }

  render = () =>
    <div className="DatePicker">
      <div className="DatePicker__inputs">
        {this.renderInput('A')}
        <div className='DatePicker__inputs__dash'>
          —
        </div>
        {this.renderInput('B')}
        {this.renderCalendar()}
      </div>
    </div>
}


export default DatePicker