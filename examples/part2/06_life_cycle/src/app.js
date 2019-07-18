import React, { Component } from 'react';
import Greet from './greet';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { count: 0 };    
  }                           
  
  componentDidMount() {
    this.intervalid = setInterval(() => this.changeCount(), 1000);    
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalid);
  }
  
  changeCount() {
    let count = this.state.count + 1;
    
    if(count === 11) { count = 0 };
    
    this.setState({count});
  }
  
  render() { 
    const stuff = this.state.count < 10 ?
      <span><Greet count={this.state.count}></Greet></span> : 
      <span>restart</span>;

    return <div>{stuff}</div>;
  }
}