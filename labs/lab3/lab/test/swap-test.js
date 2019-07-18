import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import Swap from '../src/swap';

configure({ adapter: new Adapter() });

describe('Swap test', function() {
  let sandbox;

  beforeEach(() => { 
    sandbox = sinon.createSandbox(); 
  });
  
  afterEach(() => sandbox.restore());

  xit('Swap renders error if zero children provided', () => {
    const wrapper = shallow(<Swap />);
    
    expect(wrapper.text()).to.be.eql('Please provide two children');
  });

  xit('Swap renders error if one children provided', () => {
    const wrapper = shallow(<Swap><span/></Swap>);
    
    expect(wrapper.text()).to.be.eql('Please provide two children');
  });

  xit('Swap renders error if more than two children provided', () => {
    const wrapper = shallow(<Swap><span/><hr/><span/></Swap>);
    
    expect(wrapper.text()).to.be.eql('Please provide two children');
  });
  
  xit('Swap has a default property for showfirst', () => {
    const wrapper = shallow(<Swap />);
    
    expect(wrapper.instance().props.showfirst).to.be.true;
  });

  xit('Swap takes showfirst property', () => {
    const wrapper = shallow(<Swap showfirst={ false }/>);
    
    expect(wrapper.instance().props.showfirst).to.be.false;
  });

  xit('Swap renders first when showfirst is not set', () => {
    const wrapper = shallow(<Swap><span>A</span><span>B</span></Swap>);
    
    expect(wrapper.text()).to.be.eql('AB');
  });

  xit('Swap renders first when showfirst is set to true', () => {
    const wrapper = shallow(<Swap showfirst={ true }><span>A</span><span>B</span></Swap>);
    
    expect(wrapper.text()).to.be.eql('AB');
  });

  xit('Swap renders second when showfirst is set to false', () => {
    const wrapper = shallow(<Swap showfirst={ false }><span>A</span><span>B</span></Swap>);
    
    expect(wrapper.text()).to.be.eql('BA');
  });
});