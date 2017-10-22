import React, { Component } from 'react'
import Survey from './Survey'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stealz Survey API</h1>
        </header>
        <div>
          <Survey email='lukasbbarry@gmail.com' major='590'/>
        </div>
      </div>
    )
  }
}

export default App
