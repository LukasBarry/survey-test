import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoodQuestion from './MoodQuestion'

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
                <form>
                    <h3>{question.text}</h3>
                    {question.multiple_choice_answers.map((answer) =>
                        <div key={answer.id}>
                            <input type='radio'
                                   name='multiple_choice_answer_id'
                                   value={answer.id}
                                   onChange={() =>
                                       this.props.nextQuestion(
                                           { "question_id": question.id,
                                             "multiple_choice_answer_id": answer.id},
                                           answer.next_question_id
                                       )
                                   }/>
                            {answer.text}
                        </div>
                    )}
                </form>
            )
        case 'SliderQuestion':
            return (
                <form>
                    <h3>{question.text}</h3>
                    {question.multiple_choice_answers.map((answer) =>
                        <div key={answer.id}>
                            <input type='radio'
                                   name='multiple_choice_answer_id'
                                   value={answer.id}
                                   onChange={() =>
                                       this.props.nextQuestion(
                                           { "question_id": question.id,
                                             "multiple_choice_answer_id": answer.id},
                                           answer.next_question_id
                                       )
                                   }/>
                            {answer.text}
                        </div>
                    )}
                </form>
            )
        default:
            return (
                <form>
                    <h3>{question.text}</h3>
                    {question.multiple_choice_answers.map((answer) =>
                        <div key={answer.id}>
                            <input type='radio'
                                   name='multiple_choice_answer_id'
                                   value={answer.id}
                                   onChange={() =>
                                       this.props.nextQuestion(
                                           { "question_id": question.id,
                                             "multiple_choice_answer_id": answer.id},
                                           answer.next_question_id
                                       )
                                   }/>
                            {answer.text}
                        </div>
                    )}
                </form>
            );
        }
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
