import logo from './logo.svg';
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form.jsx'
import HomePage from './components/home-page/home-page'

import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><HomePage/></Route>
          <Route exact path="/payroll-form"><PayrollForm/></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
