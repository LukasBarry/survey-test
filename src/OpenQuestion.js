import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/lib/FormControl';
import ConditionalButton from './ConditionalButton';

export default class OpenQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

    onClick() {
        const question = this.props.question;
        this.props.nextQuestion({ 'question_id': question.id,
                                  'open_answer': this.state.value },
                                question.next_question_id)
    }

    render() {
        let question = this.props.question;
        return (
            <div key={question.id}>
                <h3>{question.text}</h3>
                <FormControl componentClass='textarea'
                             onChange={this.handleChange}
                             className='text_box'/>
                <span className='clearfix'>10 character minimum</span>
                <ConditionalButton condition={this.state.showButton}
                                   onClick={this.onClick} />
            </div>
        );
    }
}


OpenQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}
