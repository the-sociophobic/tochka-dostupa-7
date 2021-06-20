import React from 'react'

import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

import DatePicker from '../components/DatePicker'


export type RangePickerProps = {
	dateA: Date | undefined
	dateB: Date | undefined
  setDateA: (value: Date | undefined) => void
  setDateB: (value: Date | undefined) => void
	locale: string
}


export const RangePicker: React.FC<RangePickerProps> = ({
	dateA,
  dateB,
  setDateA,
  setDateB,
  locale
}) => {
	const [currentOpened, setCurrentOpened] = React.useState(-1)
	
	return (
    <div className="RangePicker">
      <DatePicker
        locale={locale}
        value={dateA}
        onChange={(value: Date | undefined) => {
          setDateA(value)
          setCurrentOpened(1)
        }}
        validateValue={(value: Date | undefined) =>
          !dateB || !value || isBefore(value, dateB)}
      />
      <div className='RangePicker__dash'>
        —
      </div>
      <DatePicker
        locale={locale}
        value={dateB}
        onChange={(value: Date | undefined) => {
          setDateB(value)
          setCurrentOpened(0)
        }}
        validateValue={(value: Date | undefined) =>
          !dateA || !value || isAfter(value, dateA)}
      />
    </div>
	)
}


export default RangePicker
