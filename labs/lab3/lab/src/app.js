import React, { Component } from 'react';
import Airport from './airport';
import DisplayAirportStatus from './display-airport-status';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { airportInfo: [] };
    
    this.increment = true;
  }

  componentDidMount() {            
    const airportInfo = [
      new Airport('IAD', 'Washington Dulles International', 84.14, true),
      new Airport('IAH', 'Houston Bush International', 99.20, false),
      new Airport('STL', 'St. Louis', 81.40, true),
      new Airport('SLC', 'Salt Lake City', 82.28, false),
      new Airport('BOS', 'Boston', 77.75, true),
      new Airport('SFO', 'San Franscico International', 67.24, false),
      new Airport('DEN', 'Denver International Airport', 62.00, true),
      new Airport('MSP', 'Minneapolis St. Paul Airport', 42.37, false),
      new Airport('FLL', 'Fort Lauderdale', 95.54, true),
      new Airport('MIA', 'Miami International Airport', 95.20, false),
      new Airport('SEA', 'Seattle Tacoma Airport', 81.12, true),
      new Airport('ORD', "Chicago O'Hare International Airport", 77.12, false),
      new Airport('EWR', 'Newark Airport', 72.23, true),
      new Airport('JFK', 'John F. Kennedy Airport', 71.23, false),
      new Airport('AUS', 'Austin International Airport', 88.18, true),
    ];
    
    this.setState({ airportInfo });
    
    setInterval(() => this.changeData(), 1000);
  }
 
  changeData() {
    const updatedData = [];

    let delta = -1;
    if(this.increment) {
      delta = 1;
    }
    
    this.increment = !this.increment;
    
    for(const airport of this.state.airportInfo) {
      updatedData.push(Object.assign(new Airport(), airport, { temperature: airport.temperature + delta }));
    }
    
    this.setState({ airportInfo: updatedData });
  } 
  
  render() {
    return <div>
      <h1>Airport Status</h1>
      <DisplayAirportStatus data={ this.state.airportInfo }></DisplayAirportStatus>
    </div>;
  }
}