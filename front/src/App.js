import { BrowserRouter as Router, Route, useLocation } from "react-router-dom"
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import logo from './logo.svg';
import Diary from './Diary.js';
import Calendar from './Calendar.js';

const moment = extendMoment(Moment);

const Home = props => {
  const query = new URLSearchParams(useLocation().search)
  const dateFrom = query.get('date-to') ? moment(query.get('date-from'), 'YYYY/MM/DD') : moment()
  const dateTo = query.get('date-to') ? moment(query.get('date-to'), 'YYYY/MM/DD') : dateFrom
  const dateRange = moment.range(dateFrom, dateTo).by('day')
  return (
    <div>
      <h1>md-iary</h1>
      <Calendar history={props.history} />
      {Array.from(dateRange).map(
        date => <Diary date={date} />
      )}
    </div>
  )
}

const App = props => (
  <Router>
    <Route exact path="/" component={Home}></Route>
  </Router>
)

export default App;
