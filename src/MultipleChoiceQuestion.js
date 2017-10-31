/* global _ */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radio from 'react-bootstrap/lib/Radio';
import ConditionalButton from './ConditionalButton';

export default class MultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            answer: null,
            showButton: false
        };
    }

    handleChange(e) {
        const answerId = parseInt(e.target.value, 10);
        const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
        this.setState({ answer,
                        showButton: true });
    }

    onClick() {
        const answer = this.state.answer;
        this.props.nextQuestion({ 'question_id': this.props.question.id,
                                  'multiple_choice_answer_id': answer.id },
                                answer.next_question_id);
    }

    render() {
        let question = this.props.question;
        return (
            <div>
                <h3>{question.text}</h3>
                {question.multiple_choice_answers.map((answer) => {
                    return (
                        <Radio key={answer.id}
                               name='answers'
                               value={answer.id}
                               onChange={this.handleChange}>
                            <span className='radio'>{answer.text}</span>
                        </Radio>
                    )
                })}
                <ConditionalButton condition={this.state.showButton}
                                   onClick={this.onClick} />
            </div>
        );
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}
