import { BrowserRouter as Router, Route, useLocation } from "react-router-dom"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useState, useEffect } from 'react';

import Diary from './Diary.js';
import Calendar from './Calendar.js';

import Footer from './Footer.js';


const moment = extendMoment(Moment);

const Home = ({history}) => {
  const query = new URLSearchParams(useLocation().search)
  const dateFrom = query.get('date-to') ? moment(query.get('date-from'), 'YYYY/MM/DD') : moment()
  const dateTo = query.get('date-to') ? moment(query.get('date-to'), 'YYYY/MM/DD') : dateFrom
  const dateRange = moment.range(dateFrom, dateTo).by('day')
  const [Diaries, setDiaries] = useState([])
  useEffect(() => {
    console.log(query)
    alert('fetch!')
    // asyncでアロー関数して、awaitでfetchすればよさそう(GET)
    // APIキー, begin, end をもらって、
    // datesの配列を受け取って, initialTreeData, initialValue に配分すればよさそう
    // ローディングがあるといいかも
    setDiaries(Array.from(dateRange).map(date =>
      <Diary
        date={date}
        initialTreeData={ [{name: 'fetched task name', status: 0, expanded: true}] }
        initialValue={"fetched note value"}
      />
    ))
  }, [Array.from(query.values()).join("-")])
  return (
    <>
      <Calendar history={history} dateFrom={dateFrom} dateTo={dateTo} />
      {Diaries}
      <Footer />
    </>
  )
}

const App = props => (
  <Router>
    <Route exact path="/" component={Home}></Route>
  </Router>
)

export default App;
