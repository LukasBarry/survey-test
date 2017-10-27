import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConditionalButton from './ConditionalButton'
import FormControl from 'react-bootstrap/lib/FormControl';

class OpenQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null,
            showButton: false
        };
    }

    handleChange(e) {
        var characterCount = e.target.value;
        this.setState({ value: e.target.value });
        if (characterCount.length > 10) {
            this.setState({ showButton: true })
        }
    }

    onClick(question) {
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": this.state.value },
                                question.next_question_id)
    }

    render() {
        let question = this.props.question;
        return (
            <div key={question.id}>
                <h3>{question.text}</h3>
                <FormControl componentClass="textarea"
                             onChange={this.handleChange}
                             className='text_box'/>
                <ConditionalButton condition={this.state.showButton}
                                   onClick={this.onClick(question)}>
                    Next
                </ConditionalButton>
            </div>
        );
    }
}


OpenQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default OpenQuestion;
