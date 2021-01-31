import React, { useState } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom"
import 'moment/locale/ja'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const Calendar = props => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="startDateId"
      endDate={endDate}
      endDateId="endDateId"
      focusedInput={focusedInput}
      onFocusChange={setFocusedInput}
      onDatesChange={({startDate, endDate}) => {
        setStartDate(startDate)
        setEndDate(endDate)
        if(startDate && endDate){
          props.history.push({
            pathname: '/',
            search: `?date-from=${startDate.format('Y/MM/DD')}&date-to=${endDate.format('Y/MM/DD')}`
          })
        }
      }}
      isOutsideRange={() => false}
    />
  )
}

export default Calendar;
