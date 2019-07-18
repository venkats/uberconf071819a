import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      values: [1, 2, 3, 4, 5, 6]
    };
  } 

  render() {
    return <div>
      <ul>
        {
          this.state.values.map((number) => <li key={ number }>{ number }</li>)
        }
      </ul>
    </div>;
  }
}