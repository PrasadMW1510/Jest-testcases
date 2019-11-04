import * as Actions from '../actions';

describe('Read 180 Respond Write Container Action', () => {
  it('should return the correct constant for getRespondWriteRequest', () => {
    expect(Actions.getRespondWriteRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for setRespondWriteRequest', () => {
    expect(Actions.setRespondWriteRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for setRespondWrites44Request', () => {
    expect(Actions.setRespondWrites44Request()).toMatchSnapshot();
  });
  it('should return the correct constant for saveRespondData', () => {
    expect(Actions.saveRespondData()).toMatchSnapshot();
  });
});
