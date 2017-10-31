/* global _ */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConditionalButton from './ConditionalButton'

export default class SliderQuestion extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            answer: null,
            showButton: false
        };
    }

    handleChange(event) {
        const answerId = parseInt(event.target.value);
        const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
        this.setState({ answer,
                        showButton: true,
                        position: event.target.value });
    }

    onClick() {
        const question = this.props.question;
        const answer = question.multiple_choice_answers[this.state.position]
        this.props.nextQuestion({ 'question_id': question.id,
                                  'multiple_choice_answer_id': answer.id },
                                answer.next_question_id)
    }

    render() {
        const question = this.props.question;
        return (
            <form>
                <span className='left'>Very Dissatisfied</span>
                <input className='slider'
                       type='range'
                       defaultValue={2}
                       max={question.multiple_choice_answers.length - 1}
                       onChange={this.handleChange} />
                <span className='right'>Highly satisfied</span>
                <br></br>
                <ConditionalButton condition={this.state.showButton}
                                   onClick={this.onClick} />
            </form>

        )
    }
}

SliderQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}
