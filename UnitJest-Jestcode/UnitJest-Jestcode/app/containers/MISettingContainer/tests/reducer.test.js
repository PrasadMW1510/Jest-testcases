import { fromJS } from 'immutable';
import * as Constants from 'components/MISetting/constants';
import miSettingContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('MISettingContainer reducer', () => {
  let initialState = null;
  let mockMISettingContainerState = null;

  beforeEach(() => {
    initialState = fromJS({
      error: false,
      loading: false,
      proficiencyBandData: {},
      programSettingsObj: {},
    });
    mockMISettingContainerState = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(miSettingContainerReducer(undefined, {})).toEqual(mockMISettingContainerState);
  });

  it('should handle MI settings request correctly', () => {
    const mockProgramSetting = {
      key1: 'value1',
    };
    const mockProficiencyBandData = {
      key1: 'value1',
    };
    const newState = initialState
      .set('loading', false)
      .set('programSettingsObj', fromJS(mockProgramSetting))
      .set('proficiencyBandData', fromJS(mockProficiencyBandData));
    expect(
      miSettingContainerReducer(
        undefined,
        Actions.MIProgramSettingsRequestSuccess(mockProgramSetting, mockProficiencyBandData)
      )
    ).toEqual(newState);
  });

  describe('Save requests', () => {
    it('should handle TabSettings save request correctly', () => {
      const mockImmFormProgramSettingsSaved = {
        key1: 'value1',
        key2: 'value2',
      };
      const newState = fromJS({
        error: false,
        loading: false,
        proficiencyBandData: {},
        programSettingsObj: mockImmFormProgramSettingsSaved,
      });
      expect(
        miSettingContainerReducer(
          undefined,
          Actions.MISaveRequestSuccess(Constants.TAB_SETTINGS, mockImmFormProgramSettingsSaved)
        )
      ).toEqual(newState);
    });

    it('should handle TabAdvancedSettings save request correctly', () => {
      const mockImmFormProgramSettingsSaved = {
        key1: 'value1',
        key2: 'value2',
      };
      const newState = fromJS({
        error: false,
        loading: false,
        proficiencyBandData: mockImmFormProgramSettingsSaved,
        programSettingsObj: {},
      });
      expect(
        miSettingContainerReducer(
          undefined,
          Actions.MISaveRequestSuccess(
            Constants.TAB_ADVANCED_SETTINGS,
            fromJS(mockImmFormProgramSettingsSaved)
          )
        )
      ).toEqual(newState);
    });

    it('should handle unrecognized tab save request correctly', () => {
      const mockImmFormProgramSettingsSaved = {
        key1: 'value1',
        key2: 'value2',
      };
      const newState = fromJS({
        error: false,
        loading: false,
        proficiencyBandData: {},
        programSettingsObj: {},
      });
      expect(
        miSettingContainerReducer(
          undefined,
          Actions.MISaveRequestSuccess('unknown', fromJS(mockImmFormProgramSettingsSaved))
        )
      ).toEqual(newState);
    });
  });

  it('should set error on failure', () => {
    const newState = initialState.set('error', 'Some error');
    expect(
      miSettingContainerReducer(initialState, Actions.MIProgramSettingsRequestFailure('Some error'))
    ).toEqual(newState);
  });
});
