import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Take Flight</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
