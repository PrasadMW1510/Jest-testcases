import * as Actions from '../actions';

describe('RCSettingContainer actions', () => {
  it('should return the correct constant for rcSettingsContainerRequest', () => {
    expect(Actions.rcSettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for rcSettingsContainerSuccess', () => {
    expect(Actions.rcSettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rcSettingsContainerFailure', () => {
    expect(Actions.rcSettingsContainerFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetSettingsSuccess without params', () => {
    expect(Actions.rcGetSettingsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetSettingsSuccess with params', () => {
    expect(Actions.rcGetSettingsSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetSettingsFailure', () => {
    expect(Actions.rcGetSettingsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for rcSettingsSave', () => {
    expect(Actions.rcSettingsSave('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for rcSettingsSaveSuccess', () => {
    expect(Actions.rcSettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rcSettingsSaveFailure', () => {
    expect(Actions.rcSettingsSaveFailure('mock error')).toMatchSnapshot();
  });

  // TODO: Uncomment and update for actions related to the second tab (if one exists).

  /* it('should return the correct constant for rcGetInstallStagesSuccess', () => {
    expect(Actions.rcGetInstallStagesSuccess('mockInstallStages')).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetInstallStagesFailure', () => {
    expect(Actions.rcGetInstallStagesFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for rcSetSelectedStage', () => {
    expect(Actions.rcSetSelectedStage('mockSelectedStage')).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetTopicsSuccess', () => {
    expect(Actions.rcGetTopicsSuccess('mockTopics')).toMatchSnapshot();
  });

  it('should return the correct constant for rcGetTopicsFailure', () => {
    expect(Actions.rcGetTopicsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for rcTopicSave', () => {
    expect(Actions.rcTopicSave('mockTopicData')).toMatchSnapshot();
  });

  it('should return the correct constant for rcTopicSaveSuccess', () => {
    expect(Actions.rcTopicSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rcTopicSaveFailure', () => {
    expect(Actions.rcTopicSaveFailure('mock error')).toMatchSnapshot();
  }); */
});
