import React, { Component } from 'react';
import Greet from './greet';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Joe' };
  } 
  
  componentDidMount() {
    setTimeout(() => this.setState({ name: 'Sara' }), 5000);
  } 
  
  render() {
    return <div>
      <Greet name={ this.state.name } />
    </div>;
  }
}