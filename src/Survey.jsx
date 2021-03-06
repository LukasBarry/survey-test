/* global fetch */
import _ from 'lodash';
import React, { Component } from 'react';
import Question from './Question';

export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: null,
      responses: [],
      success: null,
      failure: null,
    };
    this.saveResponse = this.saveResponse.bind(this);
  }

  componentWillMount() {
    fetch('/surveys/new.json?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
      .then(results => results.json())
      .then((data) => {
        const { survey } = data;
        this.setState({ survey });
        this.selectQuestion(survey.first_question_id);
      });
  }

  saveResponse(answer, questionId) {
    this.state.responses.push(answer);
    this.selectQuestion(questionId);
  }

  selectQuestion(questionId) {
    const question = _.find(this.state.survey.questions, ['id', questionId]);
    this.setState({ currentQuestion: question });
    if (!question) {
      this.submitSurvey();
    }
  }

  submitSurvey() {
    fetch('/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: 'lukasbbarry@gmail.com',
        },
        beacon: {
          major: 590,
        },
        survey: {
          responses_attributes: this.state.responses,
        },
      }),
    }).then((response) => {
      if (response.status === 201) {
        this.setState({ success: true });
      } else {
        this.setState({ failure: true });
      }
    });
  }

  render() {
    if (this.state.currentQuestion) {
      return (
        <Question
          key={this.state.currentQuestion.id}
          question={this.state.currentQuestion}
          nextQuestion={this.saveResponse} />
      );
    } else if (this.state.success) {
      return (
        <h3>Thank you for taking our survey</h3>
      );
    } else if (this.state.failure) {
      return (
        <h3>I&apos;m sorry, something went wrong</h3>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}
