import React, { Component } from 'react';
import './App.css';
import {WIPColumn} from './components/wip.js'

class App extends Component {
  render() {
    return (
        <div className="App" key="blank">
          <WIPColumn size="100" />
        </div>
    );
  }
}

export default App;
