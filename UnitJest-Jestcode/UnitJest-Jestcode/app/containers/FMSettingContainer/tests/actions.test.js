import * as Actions from '../actions';

describe('FMSettingContainer actions', () => {
  it('should return the correct constant for fmSettingsContainerRequest', () => {
    expect(Actions.fmSettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for fmSettingsContainerSuccess', () => {
    expect(Actions.fmSettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for fmSettingsContainerFailure', () => {
    expect(Actions.fmSettingsContainerFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetSettingsSuccess without params', () => {
    expect(Actions.fmGetSettingsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetSettingsSuccess with params', () => {
    expect(Actions.fmGetSettingsSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetSettingsFailure', () => {
    expect(Actions.fmGetSettingsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for fmSettingsSave', () => {
    expect(Actions.fmSettingsSave('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for fmSettingsSaveSuccess', () => {
    expect(Actions.fmSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for fmSettingsSaveFailure', () => {
    expect(Actions.fmSettingsSaveFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetAdvancedSettingsSuccess without params', () => {
    expect(Actions.fmGetAdvancedSettingsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetAdvancedSettingsSuccess with params', () => {
    expect(Actions.fmGetAdvancedSettingsSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for fmGetAdvancedSettingsFailure', () => {
    expect(Actions.fmGetAdvancedSettingsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for fmAdvancedSettingsSave', () => {
    expect(Actions.fmAdvancedSettingsSave('mockAdvancedSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for fmAdvancedSettingsSaveSuccess', () => {
    expect(Actions.fmAdvancedSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for fmAdvancedSettingsSaveFailure', () => {
    expect(Actions.fmAdvancedSettingsSaveFailure('mock error')).toMatchSnapshot();
  });
});
