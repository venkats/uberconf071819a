import React, { Component } from 'react';
import Greet from './greet';

export default class App extends Component {
  render() {
    return <div>
      <Greet show={ false }>Do you see me 1?</Greet>
      <hr></hr>
      <Greet name="Joe" show={ true }>Do you see me 2?</Greet>
    </div>;
  }
}