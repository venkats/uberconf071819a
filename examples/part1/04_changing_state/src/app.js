import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { location: 'World' };
    
    setInterval(() => this.setState({location: 'Universe'}), 10000);
  } 
  render() {
    return <div>
      <h1>This is a test</h1>
      <p>Hello { this.state.location }</p>
    </div>;
  }
}