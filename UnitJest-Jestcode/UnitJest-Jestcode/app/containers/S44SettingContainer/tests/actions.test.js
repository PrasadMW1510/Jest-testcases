import * as Actions from '../actions';

describe('S44SettingContainer actions', () => {
  it('should return the correct constant for s44SettingsContainerRequest', () => {
    expect(Actions.s44SettingsContainerRequest()).toMatchSnapshot();
  });

  describe('should return the correct constant for s44SettingsContainerSuccess', () => {
    it('with no params passed', () => {
      expect(Actions.s44SettingsContainerSuccess()).toMatchSnapshot();
    });

    it('with params passed', () => {
      expect(Actions.s44SettingsContainerSuccess('mockSettings')).toMatchSnapshot();
    });
  });

  it('should return the correct constant for s44SettingsContainerFailure', () => {
    expect(Actions.s44SettingsContainerFailure('mockError')).toMatchSnapshot();
  });

  it('should return the correct constant for s44SettingsSave', () => {
    expect(Actions.s44SettingsSave('mockUpdatedSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for s44SettingsSaveSuccess', () => {
    expect(Actions.s44SettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for s44SettingsSaveFailure', () => {
    expect(Actions.s44SettingsSaveFailure('mockError')).toMatchSnapshot();
  });
});
