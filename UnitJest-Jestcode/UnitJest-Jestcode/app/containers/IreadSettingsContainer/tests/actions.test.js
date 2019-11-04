import * as Actions from '../actions';

describe('IreadSettingsContainer actions', () => {
  it('should return the correct constant for IreadProgramSettingsRequest', () => {
    expect(Actions.IreadProgramSettingsRequest()).toMatchSnapshot();
  });

  describe('should return the correct constant for IreadProgramSettingsRequestSuccess', () => {
    it('with no params passed', () => {
      expect(Actions.IreadProgramSettingsRequestSuccess()).toMatchSnapshot();
    });

    it('with params passed', () => {
      expect(Actions.IreadProgramSettingsRequestSuccess('mockSettings')).toMatchSnapshot();
    });
  });

  it('should return the correct constant for IreadProgramSettingsRequestFailure', () => {
    expect(Actions.IreadProgramSettingsRequestFailure('mockError')).toMatchSnapshot();
  });

  describe('should return the correct constant for IreadSaveRequest', () => {
    it('with no params passed', () => {
      expect(Actions.IreadSaveRequest()).toMatchSnapshot();
    });

    it('with params passed', () => {
      expect(Actions.IreadSaveRequest('mockSettings')).toMatchSnapshot();
    });
  });

  it('should return the correct constant for IreadSaveRequestSuccess', () => {
    expect(Actions.IreadSaveRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for IreadSaveRequestFailure', () => {
    expect(Actions.IreadSaveRequestFailure('mockError')).toMatchSnapshot();
  });
});
