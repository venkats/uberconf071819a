import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.inputRef = React.createRef();
    
    this.state = {
      values: [1, 2, 3, 4, 5, 6],
    };
  }
  
  addNewValue() {
    const values = this.state.values;
    const newvalue = this.inputRef.current.value;
    values.push(newvalue);
    
    this.setState({ values });
  } 

  render() {
    return <div>
      <input type="text" ref={ this.inputRef } />
      <button onClick={ () => this.addNewValue() }>Add</button>
      <ul className="bold">
        {
          this.state.values.map((number) => <li key={ number }>{ number }</li>)
        }
      </ul>
    </div>;
  }
}