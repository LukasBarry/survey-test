/* global fetch */
import _ from 'lodash'
import React, { Component } from 'react'
import Question from './Question'

export default class Survey extends Component {
    constructor (props) {
        super(props)
        this.state = {
            survey: null,
            email: null,
            major: null,
            responses: [],
            success: null,
            failure: null
        }
        this.saveResponse = this.saveResponse.bind(this);
    }

    componentWillMount () {
        fetch('/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
            .then(results => results.json())
            .then(data => {
                let survey = data.survey;
                this.setState({ survey });
                this.selectQuestion(4677);
            });
    }

    saveResponse(answer, questionId) {
        this.state.responses.push(answer)
        this.selectQuestion(questionId);
    }

    selectQuestion(questionId){
        let question = _.find(this.state.survey.questions, ['id', questionId]);
        this.setState({ currentQuestion: question });
        if (!question) {
            this.submitSurvey()
        }
    }

    submitSurvey() {
        fetch('/surveys', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: 'lukasbbarry@gmail.com'
                },
                beacon: {
                    major: 590
                },
                survey: {
                    responses_attributes: this.state.responses
                }
            })
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ success: true })
            } else {
                this.setState({ failure: true })
            }
        })
    }

    render () {
        if (this.state.currentQuestion) {
            return (
                <Question key={this.state.currentQuestion.id}
                          question={this.state.currentQuestion}
                          nextQuestion={this.saveResponse} />
            )
        } else {
            if (this.state.success) {
                return (
                    <div>Thank you for taking our survey</div>
                )
            } else if (this.state.failure) {
                return (
                    <div>I&apos;m sorry, something went wrong</div>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
        }
    }
}
