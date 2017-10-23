import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MultipleChoiceQuestion extends Component {
    render() {
        let question = this.props.question;
        return(
            <div>
                { question.multiple_choice_answers.map((answer) =>
                    <form key={answer.id}><input
                          type='radio'
                          value={answer.text}
                          key={answer.id}
                          onChange={() => this.props.nextQuestion({ "question_id": question.id,
                                                                    "multiple_choice_answer_id": answer.id},
                                          answer.next_question_id)}/>
                        {answer.text}
                    </form>) }
            </div>
        );
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
