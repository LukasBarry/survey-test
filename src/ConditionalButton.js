import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button';

export default class ConditionalButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(event);
    }

    render() {
        return (
            <Button style={{ display: this.props.condition ? 'inline' : 'none' }}
                    bsStyle='primary'
                    bsSize='large'
                    onClick={this.handleClick}>
                Next
            </Button>
        )
    }
}

ConditionalButton.propTypes = {
    onClick: PropTypes.func,
    condition: PropTypes.bool,
};
