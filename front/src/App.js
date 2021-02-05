import { BrowserRouter as Router, Route, useLocation } from "react-router-dom"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useState, useEffect } from 'react';

import logo from './logo.svg';
import Diary from './Diary.js';
import Calendar from './Calendar.js';

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
    setDiaries(Array.from(dateRange).map(date =>
      <Diary
        date={date}
        key={date}
        initialTreeData={ [{name: 'fetched task name', expanded: true}] }
        initialValue={"fetched note value"}
      />
    ))
  }, [Array.from(query.values()).join("-")])
  return (
    <div>
      <h1><a href={'/'}>md-iary</a></h1>
      <p>{`${dateRange}`}</p>
      <Calendar history={history} />
      {Diaries}
    </div>
  )
}

const App = props => (
  <Router>
    <Route exact path="/" component={Home}></Route>
  </Router>
)

export default App;
