/* global fetch */
import _ from 'lodash'
import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button';
import Question from './Question'

class Survey extends Component {
    constructor (props) {
        super(props)
        this.state = {
            survey: null,
            email: null,
            major: null,
            responses: [],
            loading: true,
            success: null,
        }
        this.saveResponse = this.saveResponse.bind(this);
    }

    componentWillMount () {
        fetch('http://localhost:3001/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
            .then(results => results.json())
            .then(data => {
                let survey = data.survey;
                this.setState({ survey });
                this.selectQuestion(survey.first_question_id);
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
        fetch('http://localhost:3001/surveys.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: {
                survey: {
                    responses_attributes: this.state.responses
                }
            }
        }).then(results => results.json())
          .then(data => {
              let survey = data.survey;
              let success = this.state.success
              if (success) {
                  this.setState({ success: true });

              }
              this.setState({ survey });
              this.selectQuestion(survey.first_question_id);
          });
    }

    render () {
        if (this.state.currentQuestion) {
            return(
                <Question question={this.state.currentQuestion}
                          nextQuestion={this.saveResponse} />
            )
        } else {
            return(
                <Button bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.submitSurvey()}>
                    Submit Survey
                </Button>
            )
        }
    }
}

export default Survey
