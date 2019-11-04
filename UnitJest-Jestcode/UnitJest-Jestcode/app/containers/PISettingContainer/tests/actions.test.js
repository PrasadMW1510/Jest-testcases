import * as Actions from '../actions';

describe('PISettingContainer actions', () => {
  it('should return the correct constant for piSettingsContainerRequest', () => {
    expect(Actions.piSettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsContainerSuccess without params', () => {
    expect(Actions.piSettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsContainerSuccess with params', () => {
    expect(Actions.piSettingsContainerSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsContainerFailure', () => {
    expect(Actions.piSettingsContainerFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsSave', () => {
    expect(Actions.piSettingsSave('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsSaveSuccess', () => {
    expect(Actions.piSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for piSettingsSaveFailure', () => {
    expect(Actions.piSettingsSaveFailure('mock error')).toMatchSnapshot();
  });
});
