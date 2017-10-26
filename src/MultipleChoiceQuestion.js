import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoodQuestion from './MoodQuestion'
import ProductQuestion from './ProductQuestion';
import SliderQuestion from './SliderQuestion'
import Radio from 'react-bootstrap/lib/Radio';

class MultipleChoiceQuestion extends Component {
    render() {
        let question = this.props.question;
        switch (question.type) {
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
                <div>
                    <h3>{question.text}</h3>
                    {question.multiple_choice_answers.map((answer) => {
                        return (
                            <Radio key={answer.id}
                                   onChange={() =>
                                       this.props.nextQuestion(
                                           { "question_id": question.id,
                                             "multiple_choice_answer_id": answer.id},
                                           answer.next_question_id
                                       )
                                   }>
                                {answer.text}
                            </Radio>
                        )
                    })}
                </div>
            );
        }
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
