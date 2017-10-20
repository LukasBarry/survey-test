/* global fetch */
import React, { Component } from 'react'

class Survey extends Component {
  constructor () {
    super()
    this.state = {
      survey: null
    }
  }

  componentWillMount () {
    fetch('http://localhost:3001/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
      .then(results => results.json())
      .then(data => {
        let survey = data.survey.questions.map((question) => {
          return <p key={question.id}><strong>{question.text}</strong></p>
        })
        this.setState({ survey })
      })
  }

  render () {
    return <div>{this.state.survey}</div>
  }
}

export default Survey
