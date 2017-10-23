/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpenQuestion from './OpenQuestion'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'

class Question extends Component {
    render() {
        let question = this.props.question;
        return(
            <div>
                <p>{question.text}</p>
                { question.type !== 'OpenQuestion'  &&
                    <div>
                        <MultipleChoiceQuestion question={this.state.currentQuestion}
                                                nextQuestion={this.saveResponse} />
                    </div>
                }
                { question.type === 'OpenQuestion'  &&
                    <div>
                        <OpenQuestion question={this.state.currentQuestion}
                                      nextQuestion={this.saveResponse} />
                    </div>
                }
            </div>
        );
    }
}

Question.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default Question;
