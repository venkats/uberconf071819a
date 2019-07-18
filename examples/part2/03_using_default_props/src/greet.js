import React, { Component } from 'react';

export default class Greet extends Component {
  render() {
    const children = this.props.show ? <p>{ this.props.children }</p> : '';
    
    return <div>
      Hello { this.props.name } { children }
    </div>;
  }
}

Greet.defaultProps = {
  name: 'there'
};