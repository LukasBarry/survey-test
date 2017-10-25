import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class MultipleChoiceQuestion extends Component {
    onClick(question) {
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": this.state.value },
                                question.next_question_id)
    }

    render() {
        let question = this.props.question;
        return (
            <div>
                <h3>{question.text}</h3>
                <FormGroup controlId="formControlsSelectMultiple">
                    <FormControl id='dropdown' componentClass="select" multiple>
                        {question.multiple_choice_answers.map((answer) => {
                            return (
                                <option key={answer.id}
                                        value={answer.text}
                                        onClick={() =>
                                            this.props.nextQuestion(
                                                { "question_id": question.id,
                                                  "multiple_choice_answer_id": answer.id},
                                                answer.next_question_id
                                            )
                                        }>
                                    {answer.text}
                                </option>
                            )
                        })}
                    </FormControl>
                </FormGroup>
            </div>
        )
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
