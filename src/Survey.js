/* global fetch */
import React, { Component } from 'react'

class Survey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      survey: null,
      email: null,
      major: null
    }
  }

  componentWillMount () {
    fetch('http://localhost:3001/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
      .then(results => results.json())
      .then(data => {
        let survey = data.survey.questions.map((question) => {
          return(
              <div key={question.id}>
                  <p>{question.text}</p>
              </div>
          )
        })
        this.setState({ survey })
      })
  }

  render () {
    return <div>{this.state.survey}</div>
  }
}

export default Survey
