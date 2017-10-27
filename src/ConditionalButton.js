import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';

class ConditionalButton extends Component {
    render() {
        let question = this.props.question;
        return (
            <Button style={{ display: this.state.showButton ? 'inline' : 'none' }}
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.onClick(question)}>
                Next
            </Button>
        )
    }
}

ConditionalButton.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default ConditionalButton;
