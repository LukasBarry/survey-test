import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpenQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: null };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    onClick(question) {
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": this.state.value },
                                question.next_question_id)
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let question = this.props.question;
        return(
            <div>
                <p>{question.text}</p>
                <textarea onChange={this.handleChange}></textarea>
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
