/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpenQuestion from './OpenQuestion'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'

class Question extends Component {
    render() {
        let question = this.props.question;
        switch (question.type) {
        case 'OpenQuestion':
            return (
                <OpenQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion} />
            )
        default:
            return (
                <MultipleChoiceQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion} />
            )
        }
    }
}

Question.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object,
}

export default Question;
