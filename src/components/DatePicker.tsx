import React from 'react'

import { format } from 'date-fns'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import setDate from 'date-fns/setDate'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import isToday from 'date-fns/isToday'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import isBefore from 'date-fns/isBefore'
import { ru, enUS } from 'date-fns/locale'

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

  presumedA: any
  presumedB: any

  currentFocused: string | undefined
  [key: string]: any
}


class DatePicker extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    const today = new Date()
    const tommorow = addDays(today, 1)

    this.state = {
      opened: false,
      current: 'day',
      stringA: '',
      stringB: '',

      presumedA: today,
      presumedB: tommorow,

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
        !(this.calendarRef?.current === e.target
          || this.calendarRef?.current?.contains(e.target)
          || e?.target?.className?.includes?.('DatePicker')
        )
          && this.setState({
            opened: false,
            currentFocused: undefined
          })
        
  setStateAndPropsDate = (dateId: string | undefined, value: string) => {
    if (!dateId
      || value.length > 8
    )
      return

    if (
      !Number.isNaN((new Date(this.inputStringToDateReadableString(value))).getTime())
      || (dateId === 'A' && this.props.dateB.length > 0 && isBefore(new Date(this.inputStringToDateReadableString(value)), new Date(this.props.dateB)))
      || (dateId === 'B' && this.props.dateA.length > 0 && isBefore(new Date(this.props.dateA), new Date(this.inputStringToDateReadableString(value))))
    ) {
      if (value === '') {
        this.props[`setDate${dateId}`]('')
        this.setState({ [`presumed${dateId}`]: addDays(new Date(), dateId === 'A' ? 0 : 1) })
      }
      else {
        this.props[`setDate${dateId}`](this.inputStringToDateReadableString(value))
        this.setState({ [`presumed${dateId}`]: new Date(this.inputStringToDateReadableString(value)) })
      }
    }

    this.setState({ [`string${dateId}`]: value })

    // console.log('this.state.stringN:', this.state[`string${dateId}`])
  }


  // PARSERS
  inputStringToWrittenDateString = (string: string) => {
    // console.log('inputStringToWrittenDateString:', string)

    return string.length === 0 ?
      ''
      :
      string.length <= 2 ?
        `${string.slice(0, 2)}`
        :
        string.length <= 4 ?
          `${string.slice(0, 2)}.${string.slice(2, 4)}`
          :
          `${string.slice(0, 2)}.${string.slice(2, 4)}.${string.slice(4)}`
  }

  inputStringToDateReadableString = (string: string) =>
    string.length === 8 ?
      `${string.slice(4)}-${string.slice(2, 4)}-${string.slice(0, 2)}`
      :
      'error'

  propsDateToInputString = (propsDate: string) => {
    if (propsDate === '')
      return ''

    const dateObj = new Date(propsDate)

    return format(dateObj, 'ddMMyyyy')
  }


  //ELEMENTS
  renderInput = (dateId: string): JSX.Element =>
    <input
      ref={this[`input${dateId}Ref`]}
      className={`
        DatePicker__inputs__item
        ${this.state.currentFocused === dateId
          && 'DatePicker__inputs__item--focused'}`}
      onChange={e => {
        const value = (e.target as unknown as HTMLTextAreaElement).value
          .replace(/[^0-9]/g, '')
          // .slice(0, 8)
        // const prevSelectionStart = e.target.selectionStart

        this.setStateAndPropsDate(dateId, value)

        // e.target.selectionStart = 0
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
      
    const selectedDateStringName = `date${this.state.currentFocused}`
    const selectedDateString = this.props[selectedDateStringName]
    // const selectedDate = new Date(selectedDateString)
    const currentMonthDay = this.state[`presumed${this.state.currentFocused}`]

    return (
      <div
        ref={this.calendarRef}
        className='DatePicker__calendar'
      >
        <div className='DatePicker__calendar__header'>
          {/* <div
            className={`DatePicker__calendar__header__day
              ${this.state.current === 'day' && 'DatePicker__calendar__header__day--active'}`}
            onClick={() => this.setState({ current: 'day' })}
          >
            {Number.isNaN(selectedDate.getTime()) ?
              <FormattedMessage id='DatePicker.day' />
              :
              format(selectedDate, 'dd', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div> */}
          <div className='d-flex flex-column'>
            <div
              className={`DatePicker__calendar__header__month
                ${this.state.current === 'month' && 'DatePicker__calendar__header__month--active'}`}
              onClick={() => this.setState({ current: 'month' })}
            >
              {/* {Number.isNaN(selectedDate.getTime()) ?
                format(currentMonthDay, 'MMMM', { locale: this.context.locale === 'rus' ? ru : enUS })
                :
                format(selectedDate, 'MMMM', { locale: this.context.locale === 'rus' ? ru : enUS })} */}
                {format(this.state[`presumed${this.state.currentFocused}`], 'MMMM', { locale: this.context.locale === 'rus' ? ru : enUS })}
            </div>
            <div className='d-flex flex-row w-100 justify-content-between'>
              <div
                className='p--arrow p--arrow--left cursor-pointer'
                onClick={() => this.setState({
                  [`presumed${this.state.currentFocused}`]: addMonths(currentMonthDay, -1)
                })}
              />
              <div
                className='p--arrow p--arrow--right cursor-pointer'
                onClick={() => this.setState({
                  [`presumed${this.state.currentFocused}`]: addMonths(currentMonthDay, 1)
                })}
              />
            </div>
          </div>
          <div className='d-flex flex-column'>
            <div
              className={`DatePicker__calendar__header__year
                ${this.state.current === 'year' && 'DatePicker__calendar__header__year--active'}`}
              onClick={() => this.setState({ current: 'year' })}
            >
              {/* {Number.isNaN(selectedDate.getTime()) ?
                format(currentMonthDay, 'yyyy', { locale: this.context.locale === 'rus' ? ru : enUS })
                :
                format(selectedDate, 'yyyy', { locale: this.context.locale === 'rus' ? ru : enUS })} */}
                {format(this.state[`presumed${this.state.currentFocused}`], 'yyyy', { locale: this.context.locale === 'rus' ? ru : enUS })}
            </div>
            <div className='d-flex flex-row w-100 justify-content-between'>
              <div
                className='p--arrow p--arrow--left cursor-pointer'
                onClick={() => this.setState({
                  [`presumed${this.state.currentFocused}`]: addYears(currentMonthDay, -1)
                })}
              />
              <div
                className='p--arrow p--arrow--right cursor-pointer'
                onClick={() => this.setState({
                  [`presumed${this.state.currentFocused}`]: addYears(currentMonthDay, 1)
                })}
              />
            </div>
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
    const currentMonthDayString = selectedDateString === '' ?
      format(this.state[`presumed${this.state.currentFocused}`], 'ddMMyyyy')
      :
      selectedDateString

    switch (this.state.current) {
      case 'day':
        // const currentMonthDayStringParsed = this.inputStringToDateReadableString(currentMonthDayString)
        const currentMonthFirstDate = setDate(this.state[`presumed${this.state.currentFocused}`], 1)

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
              const disabled = (
                (
                  this.state.currentFocused === 'A'
                  && !Number.isNaN(dateB.getTime())
                  && isBefore(dateB, thisDay)
                )
                ||
                (
                  this.state.currentFocused === 'B'
                  && !Number.isNaN(dateA.getTime())
                  && isBefore(thisDay, dateA)
                )
              )

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
              // this.setStateAndPropsDate(
              //   this.state.currentFocused,
              //   currentMonthDayString.slice(0, 2) + (1 + index < 10 ? '0' : '') + (1 + index) + currentMonthDayString.slice(4)
              // )
              this.setState({
                current: 'day',
                [`presumed${this.state.currentFocused}`]: new Date(this.inputStringToDateReadableString(currentMonthDayString.slice(0, 2) + (1 + index < 10 ? '0' : '') + (1 + index) + currentMonthDayString.slice(4)))
              })
            }}
          >
            {format(addMonths(new Date('2021-01-01'), index), 'MMM', { locale: this.context.locale === 'rus' ? ru : enUS })}
          </div>)
      case 'year':
        return Array.apply(null, Array(12)).map((value, index) =>
          <div
            className='DatePicker__calendar__body__year'
            onClick={() => {
              // this.setStateAndPropsDate(
              //   this.state.currentFocused,
              //   currentMonthDayString.slice(0, 4) + (2011 + index)
              // )
              this.setState({
                current: 'day',
                [`presumed${this.state.currentFocused}`]: new Date(this.inputStringToDateReadableString(currentMonthDayString.slice(0, 4) + (2011 + index)))
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