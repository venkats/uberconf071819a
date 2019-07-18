import React, { Component } from 'react';

export default class App extends Component {
  componentDidMount() {
    this.startTimer();
  }                   
  
  startTimer() {
    this.intervalId = setInterval(() => this.setState({}), 1000);
  }                   
  
  stopTimer() {
    clearInterval(this.intervalId);
  }
  
  render() {            
    const today = new Date();
    
    return <div>
      { today.toDateString() } {today.toLocaleTimeString()}
      <button onClick={ () => this.stopTimer() }>Stop</button>
    </div>;
  }
}