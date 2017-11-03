import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import ConditionalButton from './ConditionalButton';

export default class OpenQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      value: null,
      showButton: false,
    };
  }

  onClick() {
    const { question } = this.props;
    this.props.nextQuestion(
      {
        question_id: question.id,
        open_answer: this.state.value,
      },
      question.next_question_id,
    );
  }

  handleChange(e) {
    const characterCount = e.target.value;
    this.setState({ value: e.target.value });
    if (characterCount.length > 20) {
      this.setState({ showButton: true });
    }
  }

  render() {
    const { question } = this.props;
    return (
      <div key={question.id}>
        <h3>{question.text}</h3>
        <FormControl
          componentClass="textarea"
          onChange={this.handleChange}
          className="text_box" />
        <span className="clearfix">20 character minimum</span>
        <ConditionalButton
          condition={this.state.showButton}
          onClick={this.onClick} />
      </div>
    );
  }
}

OpenQuestion.propTypes = {
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
