import * as Actions from '../actions';

describe('S44NGSettingContainer actions', () => {
  it('should return the correct constant for s44NGSettingsContainerRequest', () => {
    expect(Actions.s44NGSettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for s44NGSettingsContainerSuccess', () => {
    expect(Actions.s44NGSettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for s44NGSettingsContainerFailure', () => {
    expect(Actions.s44NGSettingsContainerFailure('mockError')).toMatchSnapshot();
  });

  it('should return the correct constant for s44NGSettingsSave', () => {
    expect(Actions.s44NGSettingsSave('mockSaveData')).toMatchSnapshot();
  });

  it('should return the correct constant for s44NGSettingsSaveSuccess', () => {
    expect(Actions.s44NGSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for s44NGSettingsSaveFailure', () => {
    expect(Actions.s44NGSettingsSaveFailure('mockError')).toMatchSnapshot();
  });
});
