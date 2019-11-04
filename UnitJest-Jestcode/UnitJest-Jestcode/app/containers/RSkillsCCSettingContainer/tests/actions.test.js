import * as Actions from '../actions';

describe('RSkillsSettingContainer actions', () => {
  const mockErr = 'mock Error';
  const mockResults = { results: 'mockResults' };
  const mockDefaultSettings = { settings: 'mockSettings' };
  const mockTestAssignmentSaveData = { test: 1 };

  it('should return the correct constant for rSkillsCCSettingsTestAssignmentRequest', () => {
    expect(Actions.rSkillsCCSettingsTestAssignmentRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsTestAssignmentRequestFailure', () => {
    expect(Actions.rSkillsCCSettingsTestAssignmentRequestFailure(mockErr)).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsTestAssignmentRequestSuccess', () => {
    expect(
      Actions.rSkillsCCSettingsTestAssignmentRequestSuccess(
        'mockProgramSettings',
        'mockTestAssignmentMeta'
      )
    ).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsTestAssignmentRequestSuccess with no params', () => {
    expect(Actions.rSkillsCCSettingsTestAssignmentRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCTestAssignmentSaveRequest', () => {
    expect(
      Actions.rSkillsCCTestAssignmentSaveRequest(mockTestAssignmentSaveData)
    ).toMatchSnapshot();
  });

  it('should return the correct constant for RSkillsCCTestAssignmentSaveRequestFailure', () => {
    expect(Actions.rSkillsCCTestAssignmentSaveRequestFailure(mockErr)).toMatchSnapshot();
  });

  it('should return the correct constant for RSkillsCCTestAssignmentSaveRequestSuccess', () => {
    expect(Actions.rSkillsCCTestAssignmentSaveRequestSuccess(mockResults)).toMatchSnapshot();
  });

  it('should return the correct constant for RSkillsCCTestAssignmentSaveRequestSuccess with no params', () => {
    expect(Actions.rSkillsCCTestAssignmentSaveRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant got rSkillsCCDefaultSettingsRequest', () => {
    expect(Actions.rSkillsCCDefaultSettingsRequest()).toMatchSnapshot();
  });

  it('should return the correct constant got rSkillsCCDefaultSettingsRequestFailure', () => {
    expect(Actions.rSkillsCCDefaultSettingsRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant got rSkillsCCDefaultSettingsRequestSuccess', () => {
    expect(Actions.rSkillsCCDefaultSettingsRequestSuccess(mockDefaultSettings)).toMatchSnapshot();
  });

  it('should return the correct constant got rSkillsCCDefaultSettingsRequestSuccess with no params', () => {
    expect(Actions.rSkillsCCDefaultSettingsRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsSaveRequest', () => {
    expect(Actions.rSkillsCCSettingsSaveRequest(mockTestAssignmentSaveData)).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsSaveRequestFailure', () => {
    expect(Actions.rSkillsCCSettingsSaveRequestFailure(mockErr)).toMatchSnapshot();
  });

  it('should return the correct constant for rSkillsCCSettingsSaveRequestSuccess', () => {
    expect(Actions.rSkillsCCSettingsSaveRequestSuccess()).toMatchSnapshot();
  });
});
