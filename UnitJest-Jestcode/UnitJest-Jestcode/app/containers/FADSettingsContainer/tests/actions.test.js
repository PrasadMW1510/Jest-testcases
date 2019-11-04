import * as Actions from '../actions';

describe('FADSettingsContainer actions', () => {
  let retake = null;
  let reset = null;
  it('should return the correct constant for set settings request', () => {
    retake = false;
    reset = false;
    expect(Actions.setSettingsRequest(retake, reset)).toMatchSnapshot();
  });
  it('should return the correct constant for get settings request', () => {
    expect(Actions.getSettingsRequest()).toMatchSnapshot();
  });
});
