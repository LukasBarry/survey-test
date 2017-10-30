/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpenQuestion from './OpenQuestion'
import ProductQuestion from './ProductQuestion';
import SliderQuestion from './SliderQuestion'
import MoodQuestion from './MoodQuestion'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'

export default class Question extends Component {
    render() {
        let question = this.props.question;
        switch (question.type) {
        case 'OpenQuestion':
            return (
                <OpenQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion} />
            )
        case 'MoodQuestion':
            return (
                <MoodQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
            )
        case 'ProductQuestion':
            return (
                <ProductQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
            )
        case 'SliderQuestion':
            return (
                <SliderQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
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
