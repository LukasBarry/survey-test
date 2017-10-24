import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpenQuestion extends Component {
    onClick(question) {
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": "Foo bar" },
                                question.next_question_id)
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let question = this.props.question;
        return(
            <div>
                <p>{question.text}</p>
                <textarea></textarea>
                <br></br>
                <button onClick={() => this.onClick(question)}>
                    Next
                </button>
            </div>
        );
    }
}


OpenQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default OpenQuestion;
