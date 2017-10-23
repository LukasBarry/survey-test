import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpenQuestion extends Component {
    render() {
        let question = this.props.question;
        return(
            <div>
                <textarea></textarea>
                <button onClick={() => this.props.nextQuestion({ "question_id": question.id, "open_answer": "Foo bar" }, question.next_question_id)}>Submit</button>
            </div>
        );
    }
}

OpenQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default OpenQuestion;
