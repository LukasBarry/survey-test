import React, { Component } from 'react'
import Survey from './Survey'
import './App.css'
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Jumbotron id='header'>Stealz Survey API</Jumbotron>
        <div>
          <Survey />
        </div>
      </div>
    )
  }
}

export default App
