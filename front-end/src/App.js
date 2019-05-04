import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';
import UserPage from './components/UserPage';
// import JMuxer from 'jmuxer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          exact
          path='/'
          render={props => (
            <Fragment>
              <Home {...props} />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/LogIn'
          render={props => (
            <Fragment>
              <LogIn {...props} />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/UserPage'
          render={props => (
            <Fragment>
              <UserPage {...props} />
            </Fragment>
          )}
        />
      </Router>
    );
  }
}

export default App;
