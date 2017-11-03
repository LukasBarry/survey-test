import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConditionalButton from './ConditionalButton';

export default class SliderQuestion extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showButton: false,
    };
  }

  onClick() {
    const { question } = this.props;
    const answer = question.multiple_choice_answers[this.state.position];
    this.props.nextQuestion(
      {
        question_id: question.id,
        multiple_choice_answer_id: answer.id,
      },
      answer.next_question_id,
    );
  }

  handleChange(event) {
    this.setState({
      showButton: true,
      position: event.target.value,
    });
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h3>{question.text}</h3>
        <br />
        <form>
          <span className="left">Very Dissatisfied</span>
          <input
            className="slider"
            type="range"
            defaultValue={2}
            max={question.multiple_choice_answers.length - 1}
            onChange={this.handleChange} />
          <span className="right">Highly satisfied</span>
          <br />
          <ConditionalButton
            condition={this.state.showButton}
            onClick={this.onClick} />
        </form>
      </div>
    );
  }
}

SliderQuestion.propTypes = {
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
