import { expect } from 'chai';
import Airport from '../src/airport';

describe('airport test', function() {
  let airport;
  
  beforeEach(() => airport = new Airport('IAD', 'Washington Dulles International', 82.14, true));
  
  xit('airport has IATA code', () => {
    expect(airport.code).to.be.eql('IAD');
  });

  xit('airport has name', () => {
    expect(airport.name).to.be.eql('Washington Dulles International');
  });

  xit('airport has temperature', () => {
    expect(airport.temperature).to.be.eql(82.14);
  });

  xit('airport has delay', () => {
    expect(airport.delay).to.be.true;
  });
});