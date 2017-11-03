import React from 'react';
import PropTypes from 'prop-types';
import OpenQuestion from './OpenQuestion';
import ProductQuestion from './ProductQuestion';
import SliderQuestion from './SliderQuestion';
import MoodQuestion from './MoodQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

export default function Question({ question, nextQuestion }) {
  switch (question.type) {
    case 'OpenQuestion':
      return (
        <OpenQuestion
          question={question}
          nextQuestion={nextQuestion} />
      );
    case 'MoodQuestion':
      return (
        <MoodQuestion
          question={question}
          nextQuestion={nextQuestion} />
      );
    case 'ProductQuestion':
      return (
        <ProductQuestion
          question={question}
          nextQuestion={nextQuestion} />
      );
    case 'SliderQuestion':
      return (
        <SliderQuestion
          question={question}
          nextQuestion={nextQuestion} />
      );
    default:
      return (
        <MultipleChoiceQuestion
          question={question}
          nextQuestion={nextQuestion} />
      );
  }
}

Question.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    multiple_choice_answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })),
    maxChars: PropTypes.number,
  }).isRequired,
};
