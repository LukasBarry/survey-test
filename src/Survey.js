import React, { Component } from 'react';

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      survey: {},
    };
  }
  
  componentWillMount() {
    fetch('localhost:3001/surveys/new?user[email]=lukasbbarry@gmail.com&beacon[major]=590')
    .then(results => {
      return results.json();
    }).then(data => {
      let survey = data.results
      this.setState({survey: survey});
    })
  }
  
  render() {
    return (
      <div className='survey'>
        {this.state.survey}
      </div>
    )
  }
};