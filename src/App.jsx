import React from 'react';
import Survey from './Survey';
import './App.css';
import stealz from './images/stealz_logo.svg';

export default function App() {
  return (
    <div className="App clearfix">
      <div className="header">
        <img src={stealz} alt="" className="stealz" />
      </div>
      <div className="survey">
        <Survey />
      </div>
    </div>
  );
}
