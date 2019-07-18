import React, { Component } from 'react';

export default class Greet extends Component {
  render() {
    return <div>Hello { this.props.name }</div>;
  }
}