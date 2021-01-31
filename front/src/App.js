import logo from './logo.svg';
import Diary from './Diary.js';
import Calendar from './Calendar.js';

import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = props => (
  <div>
    <h1>md-iary</h1>
    <Calendar />
    <Diary />
  </div>
)

const App = props => (
  <Router>
    <Route exact path="/" component={Home}></Route>
  </Router>
)

export default App;
