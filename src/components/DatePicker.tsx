import React, { useEffect } from 'react'

import { format } from 'date-fns'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import setDate from 'date-fns/setDate'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import addYears from 'date-fns/addYears'
import subYears from 'date-fns/subYears'
import isToday from 'date-fns/isToday'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import { ru, enUS } from 'date-fns/locale'

import isValidDateString from '../utils/isValidDateString'


export type DatePickerProps = {
	value: Date | undefined
	onChange: (value: Date | undefined) => void
	label?: string
	placeholder?: string
	validateValue?: (value: Date | undefined) => boolean
	locale: string
}


export const DatePicker: React.FC<DatePickerProps> = ({
	label,
	placeholder,
	value,
	onChange,
	validateValue,
	locale
}) => {
	const [opened, setOpened] = React.useState(false)
	const [inputString, setInputString] = React.useState('')
	const [presumedDate, setPresumedDate] = React.useState(new Date())
	const [calendarBodyCurrent, setCalendarBodyCurrent] = React.useState('day')
	
	// register clicks outside calendar
	const handleClick = (e: any) =>
		(!e?.target?.className?.includes?.('DatePicker') && opened)
			&& close(true)

	useEffect(() => {
		window.addEventListener('click', handleClick)
		return () =>
			window.removeEventListener('click', handleClick)
	})

	const close = (closeWithoutSelection?: boolean) => {
		if (closeWithoutSelection) {
			if (inputString === '')
				onChange(undefined)
			else
				if (inputString !== dateToInputString(value))
					setInputString(dateToInputString(value))
		}

		setOpened(false)
		setCalendarBodyCurrent('day')
		if (typeof value !== 'undefined' && isValidDate(value))
			setPresumedDate(value)
	}

	const setStateAndPropsDate = (inputValue: string) => {
		if (inputValue.length > 8)
			return

		setInputString(inputValue)

		if (
			isValidDateString(inputStringToDateReadableString(inputValue)) &&
			(!validateValue || validateValue(new Date(inputStringToDateReadableString(inputValue))))
		) {
			if (inputValue === '') {
				onChange(undefined)
				setPresumedDate(new Date())
			} else {
				onChange(new Date(inputStringToDateReadableString(inputValue)))
				setPresumedDate(new Date(inputStringToDateReadableString(inputValue)))
			}
		}
	}

	const renderCalendar = () =>
		opened && (
			<div className='DatePicker__calendar'>
				<div className='DatePicker__calendar__header'>
					<div className="d-flex flex-column">
						<div
							className={`
								${'DatePicker__calendar__header__month'}
								${calendarBodyCurrent === 'month' ? 'DatePicker__calendar__header__month--active' : ''}
							`}
							onClick={() => setCalendarBodyCurrent('month')}
						>
							{format(presumedDate, 'MMMM', { locale: locale === 'rus' ? ru : enUS })}
						</div>
						{calendarBodyCurrent === 'day' && (
							<div className="d-flex flex-row w-100 space-between">
								<div
									className='DatePicker__arrow DatePicker__arrow--left'
									onClick={() =>
										setPresumedDate(subMonths(presumedDate, 1))}
								/>
								<div
									className='DatePicker__arrow DatePicker__arrow--right'
									onClick={() =>
										setPresumedDate(addMonths(presumedDate, 1))}
								/>
							</div>
						)}
					</div>
					<div className="d-flex flex-column">
						<div
							className={`
							${'DatePicker__calendar__header__year'}
							${calendarBodyCurrent === 'year' ? 'DatePicker__calendar__header__year--active' : ''}
						`}
							onClick={() => setCalendarBodyCurrent('year')}
						>
							{format(presumedDate, 'yyyy', { locale: locale === 'rus' ? ru : enUS })}
						</div>
						{calendarBodyCurrent === 'day' && (
							<div className="d-flex flex-row w-100 space-between">
								<div
									className='DatePicker__arrow DatePicker__arrow--left'
									onClick={() =>
										setPresumedDate(subYears(presumedDate, 1))}
								/>
								<div
									className='DatePicker__arrow DatePicker__arrow--right'
									onClick={() =>
										setPresumedDate(addYears(presumedDate, 1))}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='DatePicker__calendar__body'>{renderCalendarBody()}</div>
			</div>
		)

	const renderCalendarBody = () => {
		const selectedDateString = dateToInputString(value)
		const currentMonthDayString = selectedDateString === '' ? dateToInputString(presumedDate) : selectedDateString
		const currentMonthFirstDate = setDate(presumedDate, 1)
		const currentYear = new Date().getFullYear()

		switch (calendarBodyCurrent) {
			case 'day':
				return eachWeekOfInterval({
					start: currentMonthFirstDate,
					end: addMonths(currentMonthFirstDate, 1),
				}).map((weekFirstDay: Date) =>
					Array.apply(null, Array(7)).map((val, index) => {
						const thisDay = addDays(weekFirstDay, index)
						const disabled = !validateValue || !validateValue(thisDay)

						return (
							<div
								key={index}
								className={`
									${'DatePicker__calendar__body__day'}
									${value && isSameDay(thisDay, value) &&
										'DatePicker__calendar__body__day--active'}
									${!isSameMonth(thisDay, currentMonthFirstDate) &&
										'DatePicker__calendar__body__day--another-month'}
									${isToday(thisDay) &&
										'DatePicker__calendar__body__day--today'}
									${disabled &&
										'DatePicker__calendar__body__day--disabled'}
								`}
								onClick={() => {
									if (!disabled) {
										setStateAndPropsDate(dateToInputString(thisDay))
										close()
									}
								}}
							>
								{format(thisDay, 'd')}
							</div>
						)
					})
				)
			case 'month':
				return Array.apply(null, Array(12)).map((val, index) => (
					<div
						key={index}
						className='DatePicker__calendar__body__month'
						onClick={() => {
							setCalendarBodyCurrent('day')
							setPresumedDate(
								new Date(
									inputStringToDateReadableString(
										`${currentMonthDayString.slice(0, 2)}${1 + index < 10 ? '0' : ''}${
											1 + index
										}${currentMonthDayString.slice(4)}`
									)
								)
							)
						}}
					>
						{format(addMonths(new Date('2021-01-01'), index), 'MMM', {
							locale: locale === 'rus' ? ru : enUS,
						})}
					</div>
				))
			case 'year':
				return Array.apply(null, Array(12)).map((val, index) => (
					<div
						key={index}
						className='DatePicker__calendar__body__year'
						onClick={() => {
							setCalendarBodyCurrent('day')
							setPresumedDate(
								new Date(
									inputStringToDateReadableString(
										`${currentMonthDayString.slice(0, 4)}${currentYear + index}`
									)
								)
							)
						}}
					>
						{currentYear + index}
					</div>
				))
		}
	}

	return (
		<div className='DatePicker'>
			{label && <div className='DatePicker__label'>{label}</div>}
			<input
				className={`DatePicker__input ${opened && 'DatePicker__input--focused'}`}
				onChange={(e: any) => {
					const inputValue = ((e.target as unknown) as HTMLInputElement).value
						.replace(/[^0-9]/g, '')

					setStateAndPropsDate(inputValue)
				}}
				value={inputStringToDisplayedDateString(inputString)}
				onFocus={() => setOpened(true)}
				placeholder={placeholder}
			/>
			{renderCalendar()}
		</div>
	)
}


export default DatePicker


// Parsing functions
const inputStringToDisplayedDateString = (inputString: string) => {
	return inputString.length === 0
		? ''
		: inputString.length <= 2
		? `${inputString.slice(0, 2)}`
		: inputString.length <= 4
		? `${inputString.slice(0, 2)}.${inputString.slice(2, 4)}`
		: `${inputString.slice(0, 2)}.${inputString.slice(2, 4)}.${inputString.slice(4)}`
}

const inputStringToDateReadableString = (string: string) =>
	string.length === 8 ? `${string.slice(4)}-${string.slice(2, 4)}-${string.slice(0, 2)}` : 'error'

const dateToInputString = (date: Date | undefined) =>
	(typeof date === 'undefined' ? '' : format(date, 'ddMMyyyy'))

const isValidDate = (date: Date | undefined) =>
	typeof date !== 'undefined' && !Number.isNaN(date.getTime())
