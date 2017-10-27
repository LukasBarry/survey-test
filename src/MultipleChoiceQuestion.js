/* global _ */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoodQuestion from './MoodQuestion'
import ProductQuestion from './ProductQuestion';
import SliderQuestion from './SliderQuestion'
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';

class MultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = { answer: null };
    }

    handleChange(e) {
        const answerId = parseInt(e.target.value);
        const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
        this.setState({ answer });
    }

    onClick() {
        const answer = this.state.answer;
        this.props.nextQuestion({ "question_id": this.props.question.id,
                                  "multiple_choice_answer_id": answer.id },
                                answer.next_question_id);
    }

    render() {
        let question = this.props.question;
        switch (question.type) {
        case 'MoodQuestion':
            return (
                <MoodQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
            )
        case 'ProductQuestion':
            return (
                <ProductQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
            )
        case 'SliderQuestion':
            return (
                <SliderQuestion
                    question={question}
                    nextQuestion={this.props.nextQuestion}/>
            )
        default:
            return (
                <div>
                    <h3>{question.text}</h3>
                    {question.multiple_choice_answers.map((answer) => {
                        return (
                            <div key={answer.id}>
                                <Checkbox value={answer.id}
                                          onChange={this.handleChange}>
                                    {answer.text}
                                </Checkbox>
                            </div>
                        )
                    })}
                    <Button bsStyle="primary"
                            bsSize="large"
                            onClick={this.onClick}>
                        Next
                    </Button>
                </div>
            );
        }
    }
}

MultipleChoiceQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MultipleChoiceQuestion;
