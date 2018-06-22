import React, { Component } from 'react';
import './App.css';
import rerender from './index'

let counter = 0
const incrementCounter = () => {
  counter++
  rerender(Counter(), document.getElementById('root'))
}

const Counter =  () => (
      <div className="App">
        <header className="App-header">
          <h1>{counter}</h1>
        </header>
        <p className="App-intro">
          <button onClick={incrementCounter}>Increment</button>
        </p>
      </div>
    )

export default Counter
