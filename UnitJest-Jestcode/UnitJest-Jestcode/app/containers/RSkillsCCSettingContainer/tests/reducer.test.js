import { fromJS } from 'immutable';

import * as Actions from '../actions';
import rSkillsCCSettingContainerReducer from '../reducer';

describe('rSkillsCCSettingContainerReducer', () => {
  let initialState = null;
  const mockTestAssignmentMeta = { stages: [{ stage: { id: ['A'], name: ['Stage A'] } }] };
  const mockDefaultSettings = {};

  beforeEach(() => {
    initialState = {
      error: false,
      stages: [],
      loading: false,
      programSettings: {},
      defaultProgramSettings: {},
      defaultProgramSettingsLoading: false,
    };
  });

  it('returns the initial state', () => {
    expect(rSkillsCCSettingContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle the RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST action', () => {
    const updatedState = { ...initialState, loading: true };
    expect(
      rSkillsCCSettingContainerReducer(undefined, Actions.rSkillsCCSettingsTestAssignmentRequest())
    ).toEqual(fromJS(updatedState));
  });

  it('should handle the RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS action', () => {
    expect(
      rSkillsCCSettingContainerReducer(
        undefined,
        Actions.rSkillsCCTestAssignmentSaveRequestSuccess(mockTestAssignmentMeta)
      )
    ).toMatchSnapshot();
  });

  it('should handle the RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS action', () => {
    expect(
      rSkillsCCSettingContainerReducer(
        undefined,
        Actions.rSkillsCCSettingsTestAssignmentRequestSuccess(
          'mockProgramSettings',
          mockTestAssignmentMeta
        )
      )
    ).toMatchSnapshot();
  });

  it('should handle the RSKILLSCC_SETTINGS_CONTAINER_LOADING action', () => {
    expect(
      rSkillsCCSettingContainerReducer(undefined, Actions.rSkillsCCSettingsContainerLoading())
    ).toMatchSnapshot();
  });

  it('should handle the RSKILLSCC_DEFAULT_SETTINGS_REQUEST action', () => {
    expect(
      rSkillsCCSettingContainerReducer(undefined, Actions.rSkillsCCDefaultSettingsRequest())
    ).toMatchSnapshot();
  });

  it('should handle the RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS action', () => {
    expect(
      rSkillsCCSettingContainerReducer(
        undefined,
        Actions.rSkillsCCDefaultSettingsRequestSuccess(mockDefaultSettings)
      )
    ).toMatchSnapshot();
  });
});
