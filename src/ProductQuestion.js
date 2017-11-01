/* global _ */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilteredMultiSelect from 'react-filtered-multiselect'
import ConditionalButton from './ConditionalButton'

export default class ProductQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next_question_id: null,
            showButton: false,
            selectedProducts: []
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClearSelection = this.handleClearSelection.bind(this);
    }

    handleDeselect(index) {
        var selectedProducts = this.state.selectedProducts.slice()
        selectedProducts.splice(index, 1)
        this.setState({selectedProducts})
        if (selectedProducts.length === 0) {
            this.setState({ showButton: false })
        }
    }

    handleClearSelection() {
        this.setState({ selectedProducts: [],
                        showButton: false })
    }

    handleSelectionChange(products) {
        const answerId = products[0]['value'];
        const answer = _.find(this.props.question.multiple_choice_answers, ['id', answerId]);
        this.setState({ showButton: true,
                        next_question_id: answer.next_question_id,
                        selectedProducts: products })
    }

    onClick() {
        const next_question_id = this.state.next_question_id;
        this.props.nextQuestion(
            { 'question_id': this.props.question.id,
              'multiple_choice_answer_ids': this.state.selectedProducts.map((product) => product['value']
        )}, next_question_id);
    }

    render() {
        let question = this.props.question;
        let options = question.multiple_choice_answers.map((answer) => {
            return (
                { value: answer.id, text: answer.text }
            )
        });
        let selectedProducts = this.state.selectedProducts
        const BOOTSTRAP_CLASSES = {
            filter: 'form-control',
            select: 'form-control',
            button: 'btn btn btn-block btn-default',
            buttonActive: 'btn btn btn-block btn-primary',
        };
        return (
            <div>
                <h3>{question.text}</h3>
                <div className='product col-md-5'>
                    <FilteredMultiSelect
                        classNames={BOOTSTRAP_CLASSES}
                        onChange={this.handleSelectionChange}
                        options={options}
                        selectedOptions={selectedProducts} />
                </div>
                <div className="product col-md-5">
                    {selectedProducts.length === 0 && <p>(nothing selected yet)</p>}
                    {selectedProducts.length > 0 && <div>
                        {selectedProducts.map((product, i) => {
                            return (
                                <div key={product['value']}
                                     className='tags'>
                                    <span className='tag'
                                          style={{cursor: 'pointer'}}
                                          onClick={() => this.handleDeselect(i)}>
                                        {`${product['text']} `} &times;
                                    </span>
                                </div>
                            )}
                        )}
                    </div>}
                    {selectedProducts.length > 0 &&
                        <button className="btn btn-default"
                                onClick={this.handleClearSelection}>
                            Clear Selection
                        </button>
                    }
                    <br></br>
                    <ConditionalButton condition={this.state.showButton}
                                       onClick={this.onClick} />
                </div>
            </div>
        )
    }
}

ProductQuestion.propTypes = {
    nextQuestion: PropTypes.func,
    question: PropTypes.object,
    selectedProducts: PropTypes.object
}
