import { expect } from 'chai';
import React from 'react';
import { configure, shallow } from 'enzyme';
import App from '../src/app';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('app test', function() {
  let sandbox;
  let clock;
  
  beforeEach(() => { 
    sandbox = sinon.createSandbox(); 
    clock = sandbox.useFakeTimers();
  });
  
  afterEach(() => sandbox.restore());
  
  xit('canary test', () => {
    expect(true).to.be.true;
  });

  xit('App renders div', () => {
    expect(shallow(<App />).html().includes('<div>')).to.be.true;
  });

  xit("App renders today's date", () => {
    const today = new Date().toDateString(); 
    expect(shallow(<App />).text().includes(today)).to.be.true;
  });
  
  xit('App renders current time', () => {
    const methodStub = sandbox.stub(Date.prototype, 'toLocaleTimeString')
      .returns('whatever');

    const today = new Date().toDateString();
    expect(shallow(<App />).text().includes(`${today} whatever`)).to.be.true;
    expect(methodStub.called).to.be.true;
  });
  
  xit("App's componentDidMount calls startTimer", () => {
    const app = new App();  
    app.startTimer = sandbox.stub();
    
    app.componentDidMount();        
    
    expect(app.startTimer.called).to.be.true;
  });
  
  xit("App's startTimer calls setInterval", () => {
    const app = new App();
    const setStateStub = sinon.stub(app, 'setState')
      .withArgs({});

    app.startTimer();
    clock.tick(1000);

    expect(setStateStub.called).to.be.true;
  });
  
  xit("App's startTimer sets the interval id", () => {
    const app = new App();
    app.startTimer();
                                       
    expect(app.intervalId.id.toString()).to.be.eql(Object.keys(clock.timers)[0]);
  });
  
  xit("App's stopTimer cancels the timer", () => {
    const app = new App();
    app.startTimer();
    
    app.stopTimer();
                                       
    expect(clock.timers).to.be.eql({});
  });

  xit('App renders a button', () => {  
    expect(shallow(<App />).html().includes('<button>Stop</button>')).to.be.true;
  });
  
  xit('button click invokes stopTimer', () => {
    const stopTimerStub = sandbox.stub(App.prototype, 'stopTimer');
    
    const wrapper = shallow(<App />);
    const button = wrapper.find('button');
                             
    button.simulate('click');
    
    expect(stopTimerStub.called).to.be.true;
  });
});