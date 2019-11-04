/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('PSSettingContainer Saga', () => {
  let generator = null;
  const err = 'mockError';
  let sessionIdSelector = null;
  let mockSettings = null;
  let mockCohortObj = null;
  let mockCohortObjSelector = null;
  let mockSessionId = null;
  let mockSetting = null;
  let mockParam = null;
  let mockPiSaveObject = null;
  beforeEach(() => {
    sessionIdSelector = jest.fn();
    mockCohortObjSelector = jest.fn();
    mockSessionId = 'mockSessionId';
    mockCohortObj = { cohortType: 'Teacher', id: 'mockedId' };
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(mockCohortObjSelector);
  });
  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('psSettingContainerFlow', () => {
    beforeEach(() => {
      mockSettings = {
        audio_instructions: '1',
        student_access_to_score: '1',
        include_sample_questions: '1',
        ell_audio_instructions: '0',
      };

      generator = Saga.psSettingsContainerFlow();
    });

    it('All calls pass', () => {
      mockCohortObj = { cohortType: 'Teacher', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockSetting = {
        output: {
          output_data: [
            {
              get_settings: [
                {
                  settings: [
                    {
                      audio_instructions: '1',
                      student_access_to_score: '1',
                      include_sample_questions: '1',
                      ell_audio_instructions: '0',
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
      mockParam = {
        command: 'get_settings',
        sid: mockSessionId,
        cohort_type: mockCohortObj.cohortType.toLowerCase(),
        cohort_id: mockCohortObj.id,
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(
        call(genericNonSLMSGetAPICall, Constants.URL, mockParam)
      );
      expect(generator.next(mockSetting).value).toEqual(
        put(Actions.psSettingsContainerSuccess(mockSettings))
      );
    });

    it('All calls pass with no data', () => {
      mockCohortObj = { cohortType: 'Teacher', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockSetting = {
        output: {
          output_data: [{ get_settings: [{ settings: '' }] }],
        },
      };
      mockSettings = {};
      mockParam = {
        command: 'get_settings',
        sid: mockSessionId,
        cohort_type: mockCohortObj.cohortType.toLowerCase(),
        cohort_id: mockCohortObj.id,
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(
        call(genericNonSLMSGetAPICall, Constants.URL, mockParam)
      );
      expect(generator.next(mockSetting).value).toEqual(
        put(Actions.psSettingsContainerSuccess(mockSettings))
      );
    });
    it('All calls pass with no student enrolled in dtm', () => {
      mockCohortObj = { cohortType: 'Teacher', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockSetting = {
        output: {
          output_data: [
            {
              get_settings: [
                {
                  settings: [''],
                },
              ],
            },
          ],
        },
      };
      mockSettings = {};
      mockParam = {
        command: 'get_settings',
        sid: mockSessionId,
        cohort_type: mockCohortObj.cohortType.toLowerCase(),
        cohort_id: mockCohortObj.id,
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(
        call(genericNonSLMSGetAPICall, Constants.URL, mockParam)
      );
      expect(generator.next(mockSetting).value).toEqual(
        put(Actions.psSettingsContainerSuccess(mockSettings))
      );
    });
    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.psSettingsContainerFailure(err)));
    });
  });

  describe('psProgramSettingsSaveFlow', () => {
    beforeEach(() => {
      mockSessionId = 'mockSessionId';
      mockParam = {
        command: 'set_settings',
        sid: mockSessionId,
        cohort_type: mockCohortObj.cohortType.toLowerCase(),
        cohort_id: mockCohortObj.id,
      };
      mockSettings = {
        audio_instructions: ['1'],
        student_access_to_score: ['1'],
        include_sample_questions: ['1'],
        ell_audio_instructions: ['0'],
      };
      mockCohortObj = { cohortType: 'Teacher', id: 'mockedId', schoolId: 'mockSchoolId' };

      generator = Saga.psProgramSettingsSaveFlow({ settingsData: mockSettings });
    });

    it('All calls pass', () => {
      mockCohortObj = { cohortType: 'Teacher', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockPiSaveObject = {
        output: {
          output_data: {
            settings: {
              audio_instructions: '1',
              student_access_to_score: '1',
              include_sample_questions: '1',
              ell_audio_instructions: '0',
            },
          },
        },
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(
        call(genericNonSLMSPostAPICall, Constants.URL, mockParam, mockPiSaveObject)
      );
      expect(generator.next(mockSettings).value).toEqual(put(Actions.psSettingsSaveSuccess()));
      expect(generator.next().value).toEqual(put(Actions.psSettingsContainerRequest()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.psSettingsSaveFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All Calls are made', () => {
      const getSettingsConstants = [
        Constants.PS_SETTINGS_CONTAINER,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];
      const getTestAssignmentConstants = [
        Constants.PS_TEST_ASSIGNMENT,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];
      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.psSettingsContainerFlow),
          takeLatest(getTestAssignmentConstants, Saga.psTestAssignmenFlow),
          takeLatest(Constants.PS_SETTINGS_SAVE, Saga.psProgramSettingsSaveFlow),
        ])
      );
    });
  });
});
