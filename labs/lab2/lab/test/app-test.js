import { expect } from 'chai';
import React from 'react';
import { configure, shallow } from 'enzyme';
import App from '../src/app';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import Airport from '../src/airport';

configure({ adapter: new Adapter() });

describe('app test', function() {
  let sandbox;
  let app;
  let clock;
  
  beforeEach(() => { 
    sandbox = sinon.createSandbox(); 
    clock = sinon.useFakeTimers();
        
    app = new App({});
  });
  
  afterEach(() => sandbox.restore());
  
  xit('canary test', () => {
    expect(true).to.be.true;
  });

  xit('App constructor passes props to super', () => {
    expect(app.props).to.be.eql({});
  });

  xit('App should initialize airport data', () => {
    expect(app.state.airportInfo).to.be.eql([]);
  });

  xit('App should load airport data in componentDidMount', () => {
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
    
    app.setState = sinon.stub(app, 'setState')
      .withArgs({ airportInfo });                        
    
    app.componentDidMount();
    
    expect(app.setState.called).to.be.true;
  });
  
  xit('App renders page title', () => {
    expect(shallow(<App/>).contains(<h1>Airport Status</h1>)).to.be.true;
  });
  
  xit('App renders DisplayAirportStatus', () => {
    expect(shallow(<App />).find('DisplayAirportStatus').length).to.be.eql(1);
  });

  xit('App passes airportInfo to DisplayAirportStatus', () => {
    const wrapper = shallow(<App />);
    
    const displayAirportStatus = wrapper.find('DisplayAirportStatus');
    
    expect(displayAirportStatus.props().data).to.be.eql(wrapper.state().airportInfo);
  });

  xit('App changeData modifies airportData', () => {
    app.setState = function(data) {
      this.state = data;
    };
    
    app.componentDidMount();

    const initialData = app.state.airportInfo;    

    app.changeData();
    
    expect(initialData[0].temperature < app.state.airportInfo[0].temperature).to.be.true;
  });

  xit('App changeData revers back to original data on alternate calls', () => {
    app.setState = function(data) {
      this.state = data;
    };
    
    app.componentDidMount();

    const initialData = app.state.airportInfo;    

    app.changeData();
    app.changeData();
    
    expect(initialData[0].temperature === app.state.airportInfo[0].temperature).to.be.true;
  });
  
  xit('App calls changeData every second', () => {
    app.changeData = sinon.stub(app, 'changeData');
    app.setState = function(data) {
      this.state = data;
    };
    
    app.componentDidMount();

    clock.tick(1000);
    
    expect(app.changeData.called).to.be.true;
    app.changeData.reset();
    
    clock.tick(1000);
    
    expect(app.changeData.called).to.be.true;
  });
});