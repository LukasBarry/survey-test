/* global _ */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilteredMultiSelect from 'react-filtered-multiselect';
import ConditionalButton from './ConditionalButton';

export default class ProductQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextQuestionId: null,
      showButton: false,
      selectedProducts: [],
    };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
  }

  onClick() {
    const { nextQuestionId } = this.state;
    this.props.nextQuestion({
      question_id: this.props.question.id,
      multiple_choice_answer_ids: this.state.selectedProducts.map(product => product.value),
    }, nextQuestionId);
  }

  handleDeselect(index) {
    const selectedProducts = this.state.selectedProducts.slice();
    selectedProducts.splice(index, 1);
    this.setState({ selectedProducts });
    if (selectedProducts.length === 0) {
      this.setState({ showButton: false });
    }
  }

  handleClearSelection() {
    this.setState({
      selectedProducts: [],
      showButton: false,
    });
  }

  handleSelectionChange(products) {
    const answerId = products[0].value;
    const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
    this.setState({
      showButton: true,
      nextQuestionId: answer.next_question_id,
      selectedProducts: products,
    });
  }

  render() {
    const { question } = this.props;
    const options = question.multiple_choice_answers.map(answer => (
      { value: answer.id, text: answer.text }
    ));
    const { selectedProducts } = this.state;
    const BOOTSTRAP_CLASSES = {
      filter: 'form-control',
      select: 'form-control',
      button: 'btn btn btn-block btn-default',
      buttonActive: 'btn btn btn-block btn-primary',
    };
    return (
      <div>
        <h3>{question.text}</h3>
        <div className="product col-md-5">
          <FilteredMultiSelect
            classNames={BOOTSTRAP_CLASSES}
            onChange={this.handleSelectionChange}
            options={options}
            selectedOptions={selectedProducts} />
        </div>
        <div className="product col-md-5">
          {selectedProducts.length === 0 && <p>(nothing selected yet)</p>}
          {selectedProducts.length > 0 &&
          <div>
            {selectedProducts.map((product, i) => (
              <div
                key={product.value}
                className="tags">
                <span
                  className="tag"
                  style={{ cursor: 'pointer' }}
                  role="presentation"
                  onClick={() => this.handleDeselect(i)}
                  onKeyUp={() => this.handleDeselect(i)}>
                  {`${product.text} `} &times;
                </span>
              </div>
            ))}
          </div>}
          {selectedProducts.length > 0 &&
          <button
            className="btn btn-default"
            onClick={this.handleClearSelection}>
            Clear Selection
          </button>
          }
          <br />
          <ConditionalButton
            condition={this.state.showButton}
            onClick={this.onClick}
          />
        </div>
      </div>
    );
  }
}

ProductQuestion.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    multiple_choice_answers: PropTypes.oneOfType({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    }),
    maxChars: PropTypes.number,
  }).isRequired,
};
