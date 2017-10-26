import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';

class SliderQuestion extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ position: event.target.value });
    }

    onClick() {
        const question = this.props.question;
        const answer = question.multiple_choice_answers[this.state.position]
        this.props.nextQuestion({ "question_id": question.id,
                                  "multiple_choice_answer_id": answer.id },
                                answer.next_question_id)
    }

    render() {
        const question = this.props.question;
        return (
            <form>
                <span className='left'>Very Dissatisfied</span>
                <input className='slider'
                       type="range"
                       max={question.multiple_choice_answers.length - 1}
                       onChange={this.handleChange} />
                <span className='right'>Highly satisfied</span>
                <br></br>
                <Button bsStyle="primary"
                        bsSize="large"
                        onClick={this.onClick}>
                    Next
                </Button>
            </form>

        )
    }
}

SliderQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default SliderQuestion;
