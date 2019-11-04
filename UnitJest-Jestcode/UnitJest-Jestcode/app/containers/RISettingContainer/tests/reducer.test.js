import { fromJS } from 'immutable';
import * as Constants from 'components/RISetting/constants';
import riSettingContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('RISettingContainer reducer', () => {
  let initialState = null;
  let mockRISettingContainerState = null;

  beforeEach(() => {
    initialState = fromJS({
      error: false,
      loading: false,
      proficiencyBandData: {},
      programSettingsObj: {},
    });
    mockRISettingContainerState = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(riSettingContainerReducer(undefined, {})).toEqual(mockRISettingContainerState);
  });

  it('should handle RI settings request correctly', () => {
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
      riSettingContainerReducer(
        undefined,
        Actions.RIProgramSettingsRequestSuccess(mockProgramSetting, mockProficiencyBandData)
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
        riSettingContainerReducer(
          undefined,
          Actions.RISaveRequestSuccess(Constants.TAB_SETTINGS, mockImmFormProgramSettingsSaved)
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
        riSettingContainerReducer(
          undefined,
          Actions.RISaveRequestSuccess(
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
        riSettingContainerReducer(
          undefined,
          Actions.RISaveRequestSuccess('unknown', fromJS(mockImmFormProgramSettingsSaved))
        )
      ).toEqual(newState);
    });
  });

  it('should set error on failure', () => {
    const newState = initialState.set('error', 'Some error');
    expect(
      riSettingContainerReducer(initialState, Actions.RIProgramSettingsRequestFailure('Some error'))
    ).toEqual(newState);
  });
});
