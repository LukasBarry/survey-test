/* global fetch */
import React, { Component } from 'react'

class Question extends Component {
    constructor (props) {
        super(props)
        this.state = {
            survey: null,
            question: null,
            firstQuestion: null,
            nextQuestion: null
        }
  }

    componentWillMount() {
        fetch('http://localhost:3001/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
            .then(results => results.json())
            .then(data => {
                let survey = data.survey.questions.map((question) => {
                    return <p key={question.id}>{question.text}</p>
                })
                this.setState({ survey })
            })
    }

}

export default Question;
