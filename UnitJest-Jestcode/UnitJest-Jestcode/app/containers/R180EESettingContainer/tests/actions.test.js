import * as Actions from '../actions';

describe('R180EESettingContainer actions', () => {
  it('should return the correct constant for r180EESettingsContainerRequest', () => {
    expect(Actions.r180EESettingsContainerRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESettingsContainerSuccess', () => {
    expect(Actions.r180EESettingsContainerSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESettingsContainerFailure', () => {
    expect(Actions.r180EESettingsContainerFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetSettingsSuccess without params', () => {
    expect(Actions.r180EEGetSettingsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetSettingsSuccess with params', () => {
    expect(Actions.r180EEGetSettingsSuccess('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetSettingsFailure', () => {
    expect(Actions.r180EEGetSettingsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESettingsSave', () => {
    expect(Actions.r180EESettingsSave('mockSettings')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESettingsSaveSuccess', () => {
    expect(Actions.r180EESettingsSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESettingsSaveFailure', () => {
    expect(Actions.r180EESettingsSaveFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetInstallStagesSuccess', () => {
    expect(Actions.r180EEGetInstallStagesSuccess('mockInstallStages')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetInstallStagesFailure', () => {
    expect(Actions.r180EEGetInstallStagesFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EESetSelectedStage', () => {
    expect(Actions.r180EESetSelectedStage('mockSelectedStage')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetTopicsSuccess', () => {
    expect(Actions.r180EEGetTopicsSuccess('mockTopics')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EEGetTopicsFailure', () => {
    expect(Actions.r180EEGetTopicsFailure('mock error')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EETopicSave', () => {
    expect(Actions.r180EETopicSave('mockTopicData')).toMatchSnapshot();
  });

  it('should return the correct constant for r180EETopicSaveSuccess', () => {
    expect(Actions.r180EETopicSaveSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for r180EETopicSaveFailure', () => {
    expect(Actions.r180EETopicSaveFailure('mock error')).toMatchSnapshot();
  });
});
