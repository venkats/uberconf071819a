import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import DisplayAirportStatus from '../src/display-airport-status';
import Airport from '../src/airport';
import deepFreeze from 'deep-freeze';

configure({ adapter: new Adapter() });

describe('DisplayAirportStatus test', function() {
  let sandbox;
  let component;
  
  beforeEach(() => { 
    sandbox = sinon.createSandbox(); 
    component = new DisplayAirportStatus({});
  });
  
  afterEach(() => sandbox.restore());

  it('DisplayAirportStatus constructor passes props to super', () => {
    expect(component.props).to.be.eql({});
  });

  it('DisplayAirportStatus initilaizes sortedAirportInfo', () => {
    expect(component.state.sortedAirportInfo).to.be.eql([]);
  });
  
  it('getDerivedStateFromProps creates sortedAirportInfo from props', () => { 
                                                                                              
    const props = { data: [
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
    ]};
    
    const newState = DisplayAirportStatus.getDerivedStateFromProps(props, { sortedAirportInfo: [] });
                                           
    expect(newState.sortedAirportInfo.length === props.data.length).to.be.true;
    expect(newState.sortedAirportInfo[0].code).to.be.eql('AUS');
    expect(newState.sortedAirportInfo[props.data.length - 1].code).to.be.eql('STL');
  });

  it('getDerivedStateFromProps does not mutate props', () => { 
                                                                                              
    const props = deepFreeze({ data: [
      new Airport('IAD', 'Washington Dulles International', 84.14, true),
      new Airport('IAH', 'Houston Bush International', 99.20, false),
    ]});
    
    DisplayAirportStatus.getDerivedStateFromProps(props, { sortedAirportInfo: [] });
                                           
    expect(true).to.be.true;
  });
  
  it('component renders the sorted airportInfo', () => {
    
    const airportInfo = [
      new Airport('IAH', 'Houston Bush International', 99.20, false),      
      new Airport('DEN', 'Denver International Airport', 62.00, true),
    ];                            
  
    const wrapper = mount(<DisplayAirportStatus data={ airportInfo } />);
    
    const html = wrapper.html();             

    expect(html.includes('table')).to.be.true;
    expect(html.includes('<tr><th>Code')).to.be.true;
    expect(wrapper.find('tr').at(1).key()).to.be.eql('DENKEY');
  });
  
  it('getDerivedStateFromProps returns aiport name unchanged if no airport selected', () => {
    const props = { data: [
      new Airport('IAD', 'Washington Dulles International', 84.14, true),
      new Airport('IAH', 'Houston Bush International', 99.20, false),
    ]};
    
    const { sortedAirportInfo } = DisplayAirportStatus.getDerivedStateFromProps(props, { sortedAirportInfo: [] });
                                           
    expect(sortedAirportInfo[0].name === 'Washington Dulles International').to.be.true;
    expect(sortedAirportInfo[1].name === 'Houston Bush International').to.be.true;
  });

  it('getDerivedStateFromProps returns aiport name in all caps for selected airport', () => {
    const props = { data: [
      new Airport('IAD', 'Washington Dulles International', 84.14, true),
      new Airport('IAH', 'Houston Bush International', 99.20, false),
    ]};
    
    const { sortedAirportInfo } = DisplayAirportStatus.getDerivedStateFromProps(props, { selected:  new Airport('IAH', 'Houston Bush International', 99.20, false) });
                                           
    expect(sortedAirportInfo[0].name.includes('Washington Dulles International')).to.be.true;
    expect(sortedAirportInfo[1].name.includes('HOUSTON BUSH INTERNATIONAL')).to.be.true;
  });
  
  it('highlight airport sets selected in state to the given airport', () => {
    const airport = new Airport('IAH', 'Houston Bush International', 99.20, false);
    
    component.setState = sandbox.stub(component, 'setState')
      .withArgs({ selected: airport });
    
    component.highlight(airport);
    
    expect(component.setState.called).to.be.true;
  });
  
  it('tr onMouseEnter calls highlight with current airport', () => {
    const den = new Airport('DEN', 'Denver International Airport', 62.00, true);
    
    const airportInfo = [
      new Airport('IAH', 'Houston Bush International', 99.20, false),      
      den,
    ];                            
    
    const highlightStub = sandbox.stub(DisplayAirportStatus.prototype, 'highlight')
      .withArgs(den);
    
    const wrapper = shallow(<DisplayAirportStatus data={ airportInfo } />);
    
    const trForDEN = wrapper.find('tr').at(1);
    trForDEN.simulate('mouseEnter'); 
    
    expect(highlightStub.called).to.be.true;
  });

  it('tr onMouseLeave calls highlight with null', () => {
    const den = new Airport('DEN', 'Denver International Airport', 62.00, true);
    
    const airportInfo = [
      new Airport('IAH', 'Houston Bush International', 99.20, false),      
      den,
    ];                            
    
    const highlightStub = sandbox.stub(DisplayAirportStatus.prototype, 'highlight')
      .withArgs(null);
    
    const wrapper = shallow(<DisplayAirportStatus data={ airportInfo } />);
    
    const trForDEN = wrapper.find('tr').at(1);
    trForDEN.simulate('mouseLeave'); 
    
    expect(highlightStub.called).to.be.true;
  });
});