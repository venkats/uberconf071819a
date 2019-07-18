import React, { Component } from 'react';

export default class Greet extends Component {
  constructor(props) {
    super(props);  
    
    this.state = {name: this.props.name.toUpperCase() };
  }
  
  static getDerivedStateFromProps(props, state) {
    return { name: props.name.toUpperCase() };
  }
  
  render() {
    return <div>Hello {this.state.name} </div>;
  }
}