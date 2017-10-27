import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';

class ConditionalButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: this.props.condition,
            question: this.props.question
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let question = this.props.question
        this.props.onClick(event);
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": this.state.value },
                                question.next_question_id)
    }

    render() {
        return (
            <Button style={{ display: this.props.condition ? 'inline' : 'none' }}
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleClick}>
                Next
            </Button>
        )
    }
}

ConditionalButton.propTypes = {
    onClick: PropTypes.func,
    condition: PropTypes.bool,
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default ConditionalButton;
