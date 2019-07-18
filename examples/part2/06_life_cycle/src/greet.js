import React, { Component } from 'react';

export default class Greet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('constructor called...');
  }
  
  componentDidMount() {
    console.log('componentDidMount called...');
  }     
  
  componentWillUnmount() {
    console.log('componentWillUnmount called...');
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps called...');
    return null;
  }
  
  render() {
    return <div>Count is { this.props.count }</div>;
  }
}