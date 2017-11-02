/* global _ */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Happy from './images/happy.png'
import Indifferent from './images/neutral.png'
import Sad from './images/sad.png'
import ConditionalButton from './ConditionalButton'

export default class MoodQuestion extends Component {
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
        const answerId = parseInt(e.target.getAttribute('data-value'), 10);
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
        let images = {
            Happy: Happy,
            Indifferent: Indifferent,
            Sad: Sad
        }
        return (
            <div>
                <h3>{question.text}</h3>
                <div className='clearfix'>
                    {question.multiple_choice_answers.map((answer) => {
                        return (
                            <img key={answer.id}
                                 src={images[answer.text]}
                                 data-value={answer.id}
                                 onClick={this.handleChange}
                                 alt=''
                                 className='smiley_faces'/>
                        )
                    })}
                </div>
                <ConditionalButton condition={this.state.showButton}
                                   onClick={this.onClick} />
            </div>
        )
    }
}

MoodQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}
