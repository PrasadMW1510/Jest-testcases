/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as AppSelectors from 'containers/App/selectors';
import * as AppConstants from 'containers/App/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { TAB_ADVANCED_SETTINGS, TAB_SETTINGS } from 'components/RISetting/constants';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Transformers from '../transformers';
import defaultSaga, * as Saga from '../saga';
import * as Request from '../request';

describe('RISettingContainer Saga', () => {
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
              Constants.RI_PROGRAM_SETTINGS_REQUEST,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            ],
            Saga.riProgramSettingsRequestFlow
          ),
          takeLatest(Constants.RI_SAVE_REQUEST, Saga.RISaveRequestFlow),
        ])
      );
    });
  });

  describe('riProgramSettingsRequestFlow', () => {
    let mockEffectiveCohortObjectSelector = null;
    const mockApiProficiencyBandData = {
      apiKey1: 'value1',
      apiKey2: 'value2',
    };
    const mockTransformedProficiencyBandData = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockSriSettingsObj = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockApiProgramSettings = [
      {
        sri_settings: [mockSriSettingsObj],
      },
    ];
    beforeEach(() => {
      mockEffectiveCohortObjectSelector = jest.fn();
      generator = Saga.riProgramSettingsRequestFlow();
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
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(
        generator.next({ id: userOrgId, cohortType: AppConstants.COHORT_TYPE.School }).value
      ).toEqual(
        all([
          call(Request.getRISettings, mockApiParam),
          call(Request.getRIProficiencyBandData, sessionId),
        ])
      );
      expect(generator.next([mockApiProgramSettings, mockApiProficiencyBandData]).value).toEqual(
        put(
          Actions.RIProgramSettingsRequestSuccess(
            mockSriSettingsObj,
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
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(generator.next({ id: 3, cohortType: AppConstants.COHORT_TYPE.Grade }).value).toEqual(
        all([
          call(Request.getRISettingsForGrade, mockApiParam),
          call(Request.getRIProficiencyBandData, sessionId),
        ])
      );
      expect(generator.next([mockApiProgramSettings, mockApiProficiencyBandData]).value).toEqual(
        put(
          Actions.RIProgramSettingsRequestSuccess(
            mockSriSettingsObj,
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
      const emptySettingsInfo = [
        {
          sri_settings: null,
        },
      ];
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockEffectiveCohortObjectSelector)
      );
      expect(
        generator.next({ id: userOrgId, cohortType: AppConstants.COHORT_TYPE.School }).value
      ).toEqual(
        all([
          call(Request.getRISettings, mockApiParam),
          call(Request.getRIProficiencyBandData, sessionId),
        ])
      );
      expect(generator.next([emptySettingsInfo, mockApiProficiencyBandData]).value).toEqual(
        put(Actions.RIProgramSettingsRequestSuccess({}, mockTransformedProficiencyBandData))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(
        put(Actions.RIProgramSettingsRequestFailure(error))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('RITabSettingsSaveRequestFlow', () => {
    let mockEffectiveCohortObjectSelector = null;
    const programSettingsToSave = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockProgramSettingDataForApi = {
      key1: 'value1',
      key2: 'value2',
    };
    const mockAction = { activeTabId: TAB_SETTINGS, programSettingsToSave };
    beforeEach(() => {
      mockEffectiveCohortObjectSelector = jest.fn();
      generator = Saga.RITabSettingsSaveRequestFlow(mockAction);
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
      ).toEqual(call(Request.postRISettings, mockApiParam));
      expect(generator.next().value).toEqual(
        put(Actions.RISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
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
        call(Request.postRISettingsForGrade, mockApiParam)
      );
      expect(generator.next().value).toEqual(
        put(Actions.RISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(put(Actions.RISaveRequestFailure(error)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('RITabAdvancedSettingsSaveRequestFlow', () => {
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
      generator = Saga.RITabAdvancedSettingsSaveRequestFlow(mockAction);
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
        call(Request.postRIProficiencyBandData, mockApiParams)
      );
      expect(generator.next().value).toEqual(
        put(Actions.RISaveRequestSuccess(mockAction.activeTabId, mockAction.programSettingsToSave))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle failing flow correctly', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
      expect(generator.throw(error).value).toEqual(put(Actions.RISaveRequestFailure(error)));
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

  describe('RISaveRequestFlow', () => {
    it('should handle TabSettings save flow correctly', () => {
      const mockAction = {
        activeTabId: TAB_SETTINGS,
        key1: 'value1',
      };
      generator = Saga.RISaveRequestFlow(mockAction);
      expect(generator.next().value).toEqual(call(Saga.RITabSettingsSaveRequestFlow, mockAction));
      expect(generator.next().done).toBeTruthy();
    });

    it('should handle TabAdvancedSettings save flow correctly', () => {
      const mockAction = {
        activeTabId: TAB_ADVANCED_SETTINGS,
        key1: 'value1',
      };
      generator = Saga.RISaveRequestFlow(mockAction);
      expect(generator.next().value).toEqual(
        call(Saga.RITabAdvancedSettingsSaveRequestFlow, mockAction)
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('should handle unrecognized save flow correctly', () => {
      const mockAction = {
        activeTabId: 'unknown',
        key1: 'value1',
      };
      generator = Saga.RISaveRequestFlow(mockAction);
      expect(generator.next().done).toBeTruthy();
    });
  });
});
