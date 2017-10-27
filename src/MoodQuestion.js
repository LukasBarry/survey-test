import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Happy from './images/happy.jpg'
import Indifferent from './images/neutral.jpg'
import Sad from './images/sad.jpg'

class MoodQuestion extends Component {
    onClick(question) {
        this.props.nextQuestion({ "question_id": question.id,
                                  "open_answer": this.state.value },
                                question.next_question_id)
    }

    render() {
        let question = this.props.question;
        let images = {
            Happy: Happy,
            Indifferent: Indifferent,
            Sad: Sad
        }
        return (
            <div>
                <h3>{question.text}</h3>
                {question.multiple_choice_answers.map((answer) => {
                    return (
                        <img key={answer.id}
                             src={images[answer.text]}
                             alt=''
                             className='smiley_faces'
                             onClick={() =>
                                 this.props.nextQuestion(
                                     { "question_id": question.id,
                                       "multiple_choice_answer_id": answer.id },
                                     answer.next_question_id
                            )
                        }/>
                    )
                })}
            </div>
        )
    }
}

MoodQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object
}

export default MoodQuestion;
