import React, { useState } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom"
import 'moment/locale/ja'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import './Calendar.css';

const Calendar = ({history, dateFrom, dateTo}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const changeUrl = (s, e) => {
    if(s && e){
      history.push({
        pathname: '/',
        search: `?date-from=${s.format('Y/MM/DD')}&date-to=${e.format('Y/MM/DD')}`
      })
    } else if (s === null && e === null){
      history.push({
        pathname: '/'
      })
    } else {
      alert('開始日と終了日を入れてね')
    }
  }

  return <>
    <nav className={"navbar navbar-expand-lg navbar-light fixed-top"} id={"mainNav"}>
      <div className={"container"}>
        <a onClick={() => changeUrl(null, null)} className={"navbar-brand"}>
          Start Bootstrap
        </a>
        <span className={"subheading"}></span>
        <button className={"navbar-toggler navbar-toggler-right"} type={"button"} data-toggle={"collapse"} data-target={"#navbarResponsive"} aria-controls={"navbarResponsive"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
          Menu
          <i className={"fas fa-bars"}></i>
        </button>
        <div className={"collapse navbar-collapse"} id={"navbarResponsive"}>
          <ul className={"navbar-nav ml-auto"}>
            <li className={"nav-item"}>
              <a onClick={() => changeUrl(null, null)} className={"nav-link"} >Today</a>
            </li>
            <li className={"nav-item"}>
              <a
                onClick={() => changeUrl(moment().startOf('week'), moment().endOf('week'))}
                className={"nav-link"}
              >Week</a>
            </li>
            <li className={"nav-item"}>
              <a
                onClick={() => changeUrl(moment().startOf('month'), moment().endOf('month'))}
                className={"nav-link"}
              >Month</a>
            </li>
          </ul>
        </div>
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
          }}
          isOutsideRange={() => false}
        />
        <a onClick={() => changeUrl(startDate, endDate)} className={"nav-link btn-secondary"} >Go</a>
      </div>
    </nav>
    <header className={"masthead"} style={{backgroundImage: "url('img/home-bg.jpg')", height: "100px"}}>
      <div className={"overlay"}></div>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-lg-8 col-md-10 mx-auto"}>
            <div className={"site-heading"}>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
}
export default Calendar;
