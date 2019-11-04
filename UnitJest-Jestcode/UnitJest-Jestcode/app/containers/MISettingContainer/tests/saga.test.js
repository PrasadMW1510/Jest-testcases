/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as AppSelectors from 'containers/App/selectors';
import * as AppConstants from 'containers/App/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { TAB_ADVANCED_SETTINGS, TAB_SETTINGS } from 'components/MISetting/constants';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Transformers from '../transformers';
import defaultSaga, * as Saga from '../saga';
import * as Request from '../request';

describe('MISettingContainer Saga', () => {
  const sessionId = 'session-123';
  const userOrgId = 'school-123';
  const error = 'an error';
  let generator = null;

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              Constants.MI_PROGRAM_SETTINGS_REQUEST,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            ],
            Saga.miProgramSettingsRequestFlow
          ),
          takeLatest(Constants.MI_SAVE_REQUEST, Saga.MISaveRequestFlow),
        ])
      );
    });
  });

  describe('miProgramSettingsRequestFlow', () => {
    let mockEffectiveCohortObjectSelector = null;
    const mockApiProficiencyBandData = {
      apiKey1: 'value1',
      apiKey2: 'value2',
    };
    const mockTransformedProficiencyBandData = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockSmiSettingsObj = {
      key1: 'value1',
      key2: 'value2',
      settings: [{ key3: 'value3' }],
    };
    beforeEach(() => {
      mockEffectiveCohortObjectSelector = jest.fn();
      generator = Saga.miProgramSettingsRequestFlow();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
        .mockReturnValue(mockEffectiveCohortObjectSelector);
      jest
        .spyOn(Transformers, 'proficiencyBandsToFormRepresentation')
        .mockReturnValue(mockTransformedProficiencyBandData);
    });

    it('Should handle successful flow correctly for non-grade cohort type', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      const mockApiParam = {
        cohortId: userOrgId,
        cohortType: AppConstants.COHORT_TYPE.School,
        sessionId,
      };
      const mockApiProficiencyBandParam = {
        cohortId: userOrgId,
        cohortType: AppConstants.COHORT_TYPE.School.toLowerCase(),
        sessionId,
      };
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(
        generator.next({ id: userOrgId, cohortType: AppConstants.COHORT_TYPE.School }).value
      ).toEqual(
        all([
          call(Request.getMISettings, mockApiParam),
          call(Request.getMIProficiencyBandData, mockApiProficiencyBandParam),
        ])
      );
      expect(generator.next([mockSmiSettingsObj, mockApiProficiencyBandData]).value).toEqual(
        put(
          Actions.MIProgramSettingsRequestSuccess(
            { key3: 'value3' },
            mockTransformedProficiencyBandData
          )
        )
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle successful flow correctly for grade cohort type', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      const mockApiParam = {
        cohortId: 3,
        schoolId: userOrgId,
        sessionId,
      };
      const mockApiProficiencyBandParam = {
        cohortId: 3,
        cohortType: AppConstants.COHORT_TYPE.Grade.toLowerCase(),
        sessionId,
      };
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(generator.next({ id: 3, cohortType: AppConstants.COHORT_TYPE.Grade }).value).toEqual(
        all([
          call(Request.getMISettingsForGrade, mockApiParam),
          call(Request.getMIProficiencyBandData, mockApiProficiencyBandParam),
        ])
      );
      expect(generator.next([mockSmiSettingsObj, mockApiProficiencyBandData]).value).toEqual(
        put(
          Actions.MIProgramSettingsRequestSuccess(
            { key3: 'value3' },
            mockTransformedProficiencyBandData
          )
        )
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle successful flow correctly for absent settings', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      const mockApiParam = {
        cohortId: userOrgId,
        cohortType: AppConstants.COHORT_TYPE.School,
        sessionId,
      };
      const mockApiProficiencyBandParam = {
        cohortId: userOrgId,
        cohortType: AppConstants.COHORT_TYPE.School.toLowerCase(),
        sessionId,
      };
      const emptySettingsInfo = {};
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(
        generator.next({ id: userOrgId, cohortType: AppConstants.COHORT_TYPE.School }).value
      ).toEqual(
        all([
          call(Request.getMISettings, mockApiParam),
          call(Request.getMIProficiencyBandData, mockApiProficiencyBandParam),
        ])
      );
      expect(generator.next([emptySettingsInfo, mockApiProficiencyBandData]).value).toEqual(
        put(Actions.MIProgramSettingsRequestSuccess({}, mockTransformedProficiencyBandData))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(
        put(Actions.MIProgramSettingsRequestFailure(error))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('MITabSettingsSaveRequestFlow', () => {
    let mockEffectiveCohortObjectSelector = null;
    const programSettingsToSave = {
      chosen_settings: [
        {
          key1: 'value1',
          key2: 'value2',
        },
      ],
    };
    const mockProgramSettingDataForApi = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockAction = { activeTabId: TAB_SETTINGS, programSettingsToSave };
    beforeEach(() => {
      mockEffectiveCohortObjectSelector = jest.fn();
      generator = Saga.MITabSettingsSaveRequestFlow(mockAction);
      jest
        .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
        .mockReturnValue(mockEffectiveCohortObjectSelector);
      jest
        .spyOn(Transformers, 'programSettingsToApiRepresentation')
        .mockReturnValue(mockProgramSettingDataForApi);
    });

    it('Should handle successful flow correctly for non-grade cohort type', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      const mockApiParam = {
        cohortId: userOrgId,
        cohortType: AppConstants.COHORT_TYPE.School,
        programSettingsObj: mockProgramSettingDataForApi,
        sessionId,
      };
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(
        generator.next({ id: userOrgId, cohortType: AppConstants.COHORT_TYPE.School }).value
      ).toEqual(call(Request.postMISettings, mockApiParam));
      expect(generator.next().value).toEqual(
        put(Actions.MISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle successful flow correctly for grade cohort type', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      const mockApiParam = {
        cohortId: 3,
        programSettingsObj: mockProgramSettingDataForApi,
        schoolId: userOrgId,
        sessionId,
      };
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(generator.next({ id: 3, cohortType: AppConstants.COHORT_TYPE.Grade }).value).toEqual(
        call(Request.postMISettingsForGrade, mockApiParam)
      );
      expect(generator.next().value).toEqual(
        put(Actions.MISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(put(Actions.MISaveRequestFailure(error)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('MITabAdvancedSettingsSaveRequestFlow', () => {
    const programSettingsToSave = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockProgramSettingDataForApi = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockAction = { activeTabId: TAB_ADVANCED_SETTINGS, programSettingsToSave };
    beforeEach(() => {
      generator = Saga.MITabAdvancedSettingsSaveRequestFlow(mockAction);
      jest
        .spyOn(Transformers, 'proficiencyBandsToApiRepresentation')
        .mockReturnValue(mockProgramSettingDataForApi);
    });

    it('Should handle save correctly', () => {
      const mockApiParams = {
        districtId: userOrgId,
        proficiencyBandData: mockProgramSettingDataForApi,
        sessionId,
      };
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId }).value).toEqual(
        call(Request.postMIProficiencyBandData, mockApiParams)
      );
      expect(generator.next().value).toEqual(
        put(Actions.MISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(put(Actions.MISaveRequestFailure(error)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Get Profile Data', () => {
    let mockProfileSessionIdSelector = null;
    let mockProfileUserOrgIdSelector = null;
    let mockLoginUserOrgSelector = null;

    beforeEach(() => {
      generator = Saga.getProfileData();
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserOrgIdSelector = jest.fn();
      mockLoginUserOrgSelector = jest.fn();
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserOrgId')
        .mockReturnValue(mockProfileUserOrgIdSelector);
      jest.spyOn(AppSelectors, 'makeSelectLoginUserOrg').mockReturnValue(mockLoginUserOrgSelector);
    });

    it('Should handle returning profile data', () => {
      const userOrgType = AppConstants.USER_ORG.School;
      expect(generator.next().value).toEqual(select(mockProfileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(mockLoginUserOrgSelector));
      expect(generator.next(userOrgType).value).toEqual(select(mockProfileUserOrgIdSelector));
      const finalNext = generator.next(userOrgId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({ sessionId, userOrgId, userOrgType });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('MISaveRequestFlow', () => {
    it('should handle TabSettings save flow correctly', () => {
      const mockAction = {
        activeTabId: TAB_SETTINGS,
        key1: 'value1',
      };
      generator = Saga.MISaveRequestFlow(mockAction);
      expect(generator.next().value).toEqual(call(Saga.MITabSettingsSaveRequestFlow, mockAction));
      expect(generator.next().done).toBeTruthy();
    });

    it('should handle TabAdvancedSettings save flow correctly', () => {
      const mockAction = {
        activeTabId: TAB_ADVANCED_SETTINGS,
        key1: 'value1',
      };
      generator = Saga.MISaveRequestFlow(mockAction);
      expect(generator.next().value).toEqual(
        call(Saga.MITabAdvancedSettingsSaveRequestFlow, mockAction)
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('should handle unrecognized save flow correctly', () => {
      const mockAction = {
        activeTabId: 'unknown',
        key1: 'value1',
      };
      generator = Saga.MISaveRequestFlow(mockAction);
      expect(generator.next().done).toBeTruthy();
    });
  });
});
