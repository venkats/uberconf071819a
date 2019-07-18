import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      values: [1, 2, 3, 4, 5, 6],
      newvalue: 10
    };
  }
  
  addNewValue() {
    const values = this.state.values;
    values.push(this.state.newvalue);
    
    this.setState({ values });
  } 

  render() {
    return <div>
      <input type="text" onChange={ e => this.setState({ newvalue: e.target.value }) } defaultValue={ this.state.newvalue } />
      <button onClick={ () => this.addNewValue() }>Add</button>
      <ul className="bold">
        {
          this.state.values.map((number) => <li key={ number }>{ number }</li>)
        }
      </ul>
    </div>;
  }
}