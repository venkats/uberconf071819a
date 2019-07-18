import { expect } from 'chai';
import Airport from '../src/airport';

describe('airport test', function() {
  let airport;
  
  beforeEach(() => airport = new Airport('IAD', 'Washington Dulles International', 82.14, true));
  
  it('airport has IATA code', () => {
    expect(airport.code).to.be.eql('IAD');
  });

  it('airport has name', () => {
    expect(airport.name).to.be.eql('Washington Dulles International');
  });

  it('airport has temperature', () => {
    expect(airport.temperature).to.be.eql(82.14);
  });

  it('airport has delay', () => {
    expect(airport.delay).to.be.true;
  });
});