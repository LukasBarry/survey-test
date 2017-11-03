/* global _ */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ConditionalButton from './ConditionalButton';

export default class MultipleChoiceQuestion extends Component {
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
    const answerId = parseInt(e.target.value, 10);
    const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
    this.setState({
      answer,
      showButton: true,
    });
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h3>{question.text}</h3>
        {question.multiple_choice_answers.map(answer => (
          <ListGroup
            key={answer.id}
            className="list">
            <ListGroupItem className="group">
              <Button
                value={answer.id}
                bsStyle="primary"
                onClick={this.handleChange}
                className="choice"
                block>
                {answer.text}
              </Button>
            </ListGroupItem>
          </ListGroup>
        ))}
        <br />
        <ConditionalButton
          condition={this.state.showButton}
          onClick={this.onClick} />
      </div>
    );
  }
}

MultipleChoiceQuestion.propTypes = {
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
