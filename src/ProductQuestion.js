import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class ProductQuestion extends Component {
    render() {
        let question = this.props.question;
        return (
            <div>
                <h3>{question.text}</h3>
                <FormGroup controlId="formControlsSelectMultiple">
                    <FormControl className='dropdown' componentClass="select" multiple>
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

ProductQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default ProductQuestion;
