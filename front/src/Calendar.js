import React, { useState } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import 'moment/locale/ja'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const MyDateRangePicker = () => {
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
      onDatesChange={(selectedDates) => {
        setStartDate(selectedDates.startDate);
        setEndDate(selectedDates.endDate);
      }}
      isOutsideRange={() => false}
    />
  )
}

export default MyDateRangePicker;
