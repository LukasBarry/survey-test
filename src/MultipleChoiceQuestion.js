import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MultipleChoiceQuestion extends Component {
    render() {
        let question = this.props.question;
        return(
            <form>
                <p>{question.text}</p>
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

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
