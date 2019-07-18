import { expect } from 'chai';
import React from 'react';
import { configure, shallow, render } from 'enzyme';
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
  
  it('canary test', () => {
    expect(true).to.be.true;
  });

  it('App constructor passes props to super', () => {
    expect(app.props).to.be.eql({});
  });

  it('App should initialize airport data', () => {
    expect(app.state.airportInfo).to.be.eql([]);
  });

  it('App should load airport data in componentDidMount', () => {
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
  
  it('App renders page title', () => {
    expect(shallow(<App/>).contains(<h1>Airport Status</h1>)).to.be.true;
  });
  
  it('App renders DisplayAirportStatus', () => {
    expect(shallow(<App />).find('DisplayAirportStatus').length).to.be.eql(1);
  });

  it('App passes airportInfo to DisplayAirportStatus', () => {
    const wrapper = shallow(<App />);
    
    const displayAirportStatus = wrapper.find('DisplayAirportStatus');
    
    expect(displayAirportStatus.props().data).to.be.eql(wrapper.state().airportInfo);
  });

  it('App changeData modifies airportData', () => {
    app.setState = function(data) {
      this.state = data;
    };
    
    app.componentDidMount();

    const initialData = app.state.airportInfo;    

    app.changeData();
    
    expect(initialData[0].temperature < app.state.airportInfo[0].temperature).to.be.true;
  });

  it('App changeData revers back to original data on alternate calls', () => {
    app.setState = function(data) {
      this.state = data;
    };
    
    app.componentDidMount();

    const initialData = app.state.airportInfo;    

    app.changeData();
    app.changeData();
    
    expect(initialData[0].temperature === app.state.airportInfo[0].temperature).to.be.true;
  });
  
  it('App calls changeData every second', () => {
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
  
  xit('App renders Swap', () => {            
    //App renders <Swap><p>part one</p><p>part two</p></Swap>
    expect(shallow(<App/>).text().includes('<Swap />')).to.be.true;
    console.log(render(<App />).text());
    expect(render(<App/>).text().includes('part onepart two')).to.be.true;
  });
});