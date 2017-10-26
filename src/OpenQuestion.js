import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

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
    }

    render() {
        let question = this.props.question;
        return(
            <div key={question.id}>
                <h3>{question.text}</h3>
                <FormControl componentClass="textarea"
                             onChange={this.handleChange}
                             className='text_box'/>
                <Button bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.onClick(question)}>
                    Next
                </Button>
            </div>
        );
    }
}


OpenQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default OpenQuestion;
