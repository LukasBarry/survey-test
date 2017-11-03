/* global _ */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Happy from './images/happy.png';
import Indifferent from './images/neutral.png';
import Sad from './images/sad.png';
import ConditionalButton from './ConditionalButton';

export default class MoodQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      answer: null,
      showButton: false,
    };
  }

  onClick() {
    const { answer } = this.state;
    this.props.nextQuestion(
      {
        question_id: this.props.question.id,
        multiple_choice_answer_id: answer.id,
      },
      answer.next_question_id,
    );
  }

  handleChange(e) {
    const answerId = parseInt(e.target.getAttribute('data-value'), 10);
    const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
    this.setState({
      answer,
      showButton: true,
    });
  }

  render() {
    const { question } = this.props;
    const images = {
      Happy,
      Indifferent,
      Sad,
    };
    return (
      <div>
        <h3>{question.text}</h3>
        <div className="clearfix">
          {question.multiple_choice_answers.map(answer => (
            <img
              src={images[answer.text]}
              onClick={this.handleChange}
              onKeyUp={this.handleChange}
              data-value={answer.id}
              key={answer.id}
              alt=""
              className="smiley_faces" />
          ))}
        </div>
        <ConditionalButton
          condition={this.state.showButton}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

MoodQuestion.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    multiple_choice_answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })),
    maxChars: PropTypes.number,
  }).isRequired,
};
