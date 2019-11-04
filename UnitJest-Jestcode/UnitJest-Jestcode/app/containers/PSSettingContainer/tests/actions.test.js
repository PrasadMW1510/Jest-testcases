import * as Actions from '../actions';

describe('PSSettingContainer actions', () => {
  it('should return the correct constant for psSettingsContainerRequest', () => {
    expect(Actions.psSettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsContainerSuccess without params', () => {
    expect(Actions.psSettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsContainerSuccess with params', () => {
    expect(Actions.psSettingsContainerSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsContainerFailure', () => {
    expect(Actions.psSettingsContainerFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsSave', () => {
    expect(Actions.psSettingsSave('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsSaveSuccess', () => {
    expect(Actions.psSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for psSettingsSaveFailure', () => {
    expect(Actions.psSettingsSaveFailure('mock error')).toMatchSnapshot();
  });
  it('should return the correct constant for ps get DTM Modules', () => {
    expect(Actions.psGetDtmModulesRequest('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for ps get DTM Modules Success', () => {
    expect(Actions.psGetDtmModulesSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for ps get DTM Modules Failure', () => {
    expect(Actions.psGetDtmModulesFailure('mock error')).toMatchSnapshot();
  });
  it('should return the correct constant for psGetDtmTestsRequest', () => {
    expect(Actions.psGetDtmTestsRequest('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for psGetDtmTestsSuccess', () => {
    expect(Actions.psGetDtmTestsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for psGetDtmTestsFailure', () => {
    expect(Actions.psGetDtmTestsFailure('mock error')).toMatchSnapshot();
  });
  it('should return the correct constant for psGetDtmSubProductRequest', () => {
    expect(Actions.psGetDtmSubProductRequest('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for psGetDtmTestsSuccess', () => {
    expect(Actions.psGetDtmSubProductSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for psGetDtmTestsFailure', () => {
    expect(Actions.psGetDtmSubProductFailure('mock error')).toMatchSnapshot();
  });
  it('should return the correct constant for psTestAssignmentRequest', () => {
    expect(Actions.psTestAssignmentRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for psTestAssignmentSuccess', () => {
    expect(Actions.psTestAssignmentSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for psTestAssignmentFailure', () => {
    expect(Actions.psTestAssignmentFailure('mock error')).toMatchSnapshot();
  });
});
